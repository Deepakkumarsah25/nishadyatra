# Security and Performance Audit

**Review date:** 2026-10-06  
**Scope:** Current Express/EJS application source, middleware, route protection, Mongoose access patterns, uploads, and local project checks. This is a source-level review, not a production penetration test.

## Executive summary

The application has several useful baseline protections: admin passwords are bcrypt-hashed, successful login regenerates the session, admin routes use authentication middleware, unsafe `/admin` requests get an origin check, request bodies and uploads have size limits, uploads get extension/MIME and signature checks, list views use bounded pagination, and EJS values use escaped interpolation.

The most important issues found are disabled SMTP certificate verification, process-local session and rate-limit storage, and memory-heavy upload limits on admin routes. The homepage also loads the complete embedded Kalash video document although it displays only a small selection. Address the SMTP setting first, then use production-appropriate shared stores and review upload sizing and the homepage query.

## Findings

### Medium — SMTP server certificates are not verified

`services/mailService.js:30-38` configures Nodemailer with `tls.rejectUnauthorized: false`. This disables certificate-chain and hostname verification for the SMTP connection. A network attacker able to intercept or redirect SMTP traffic could impersonate the server and expose contact-form contents and SMTP credentials.

**Recommendation:** Remove the override so Node verifies the SMTP server certificate. If a private CA is required, configure that CA explicitly instead of disabling verification.

### Medium — Sessions use Express’s process-local MemoryStore

`config/session.js:5-27` configures `express-session` without a persistent store. The default MemoryStore loses sessions on restart and does not share sessions across workers or instances; it is unsuitable for production deployments and can increase process memory use as sessions accumulate.

**Recommendation:** Use a maintained MongoDB or Redis session store with expiry and shared configuration across instances. Keep the existing `httpOnly`, production `secure`, and `sameSite` cookie settings.

### Medium — Rate limits are local to each Node process

`middleware/rateLimit.js:1-23` stores counters in a module-level `Map`. Limits reset on restart and are not shared across processes or instances, so distributed requests can exceed the configured thresholds. `server.js` does not configure Express `trust proxy`; behind a reverse proxy, `req.ip` may identify the proxy rather than the client, causing unrelated users to share a bucket.

**Recommendation:** Use a shared rate-limit store for multi-instance production and configure trusted proxy hops only for the actual deployment topology. Keep limits on authentication and public submission endpoints.

### Medium — Admin uploads can consume hundreds of megabytes of process memory

Uploads use Multer memory storage. `middleware/homeAboutUpload.js:14-22` permits 15 files at 20 MB each (up to 300 MB per request); `middleware/kalashVideoUpload.js:27-39` permits a 100 MB video and a 100 MB thumbnail in one request. Concurrent uploads multiply this memory pressure. These routes are admin-protected, which limits exposure, but a compromised account or accidental large uploads could exhaust application memory.

**Recommendation:** Consider smaller aggregate limits, disk/object-storage streaming, and an upload concurrency limit. Preserve the current content-type and signature validation.

### Medium — Homepage reads the full embedded video list

`controllers/homeController.js:22-35` loads the Kalash Yatra document through `KalashYatra.getOrSeed()` without excluding or slicing its embedded `videos` array. The controller later displays only a few videos (`:91` and `:118-132`). The list has no visible application-level maximum in the schema at `models/KalashYatra.js:573`.

**Impact:** Home response memory use and database transfer grow with every stored video, and MongoDB documents have a finite BSON size limit.

**Recommendation:** Fetch only the highlighted/latest videos needed by the homepage or use a bounded projection/query. Consider moving a growing video collection out of the embedded document.

### Low — Contact form trusts the submitted `X-Forwarded-For` value

`controllers/contactController.js:73-78` stores `req.headers["x-forwarded-for"]` before falling back to the socket address. A direct client can supply that header, so the stored and emailed IP value is not reliable unless a trusted proxy replaces it. `trust proxy` is not configured in `server.js`.

**Recommendation:** Record `req.ip` with a carefully configured trusted-proxy setup, or treat forwarded values as untrusted metadata and parse only headers supplied by known proxies.

### Low — Upload signatures are prefix checks, not file validation

`middleware/validateUpload.js:4-35, 37-46` checks short file signatures (at most 64 bytes) but does not decode files, validate their full structure, re-encode images, or scan for malware. This is useful protection against simple extension/MIME spoofing, but it does not establish that uploaded media is safe or structurally valid.

**Recommendation:** For higher assurance, decode/re-encode images and use a media scanner or isolated processing service for uploads. Keep uploaded media served from a separate media origin where practical.

### Low — Logout is available as a state-changing GET

`routes/admin/authRoutes.js` defines both POST and GET `/logout`. `middleware/csrfProtection.js:4-5` explicitly treats GET `/logout` as unsafe and checks its origin, which reduces cross-site risk, but state changes through GET can still be triggered by crawlers, previews, or accidental navigation.

**Recommendation:** Prefer POST-only logout and remove the legacy GET endpoint when compatibility allows.

### Low — Browser security headers are incomplete

`server.js:76-81` sets `X-Content-Type-Options`, `Referrer-Policy`, and `X-Frame-Options`, and disables `X-Powered-By`. No application CSP, HSTS, or Permissions Policy was found. HSTS is best configured at the HTTPS edge after confirming the production domain and subdomain policy. A CSP needs testing because the existing EJS pages contain inline scripts and styles.

**Recommendation:** Add a report-only CSP first, then enforce a tested policy. Configure HSTS at the TLS terminator when deployment settings are known.

## Performance findings

### Medium — Uploads are buffered in memory

See the upload limits above. Peak memory is the sum of files accepted by concurrent requests, not just the size of one file. Monitor process RSS and set aggregate limits appropriate to the deployed container memory.

### Medium — Unbounded embedded-video payload on the homepage

See `controllers/homeController.js:30` and the homepage usage cited above. The dedicated `/video` route in `server.js:150-190` already uses aggregation and pagination; the homepage path does not apply the same bound to the embedded array.

### Low — Deep offset pagination and regex search can become expensive

`utils/pagination.js` caps page numbers at 10,000 and page sizes at 50, which prevents unbounded requests. At high record counts, offset pagination can still require MongoDB to walk many skipped records. News and gallery searches use escaped, bounded regular expressions, but case-insensitive substring searches may scan many documents as collections grow.

**Recommendation:** Review MongoDB `explain()` plans with production-like data. If collections grow materially, use cursor pagination and text/search indexes suited to the required search behavior.

### Low — Static assets have no explicit long-lived cache or compression setup

`server.js:105-109` serves `public` and `uploads` with Express static middleware. No compression middleware or explicit immutable `maxAge` policy was found. Express static supports validators, but assets may still be retransmitted more often than necessary and text responses may be larger than needed.

**Recommendation:** Configure compression and versioned-asset caching at the reverse proxy/CDN or application layer. Do not apply long-lived caching to mutable uploads or HTML pages without cache invalidation.

### Informational — High query concurrency on the admin dashboard

`controllers/admin/dashboardController.js:43-81` runs many counts, reads, and an aggregation concurrently. The individual result sets are mostly bounded, but the dashboard can issue substantial database work per page load. Monitor query latency and connection-pool pressure as the collections grow.

## Controls that are present

- Admin passwords are hashed with bcrypt cost 12 in the account creation flows; successful login regenerates the session.
- Admin route groups use authentication middleware, and the news admin routes apply it per route.
- Unsafe `/admin` requests use an Origin/Referer host check (`middleware/csrfProtection.js`). This is an origin check, not a synchronizer-token design.
- Session cookies are HttpOnly, SameSite=Lax, and Secure when `NODE_ENV=production`.
- URL-encoded and JSON request bodies are limited to 1 MB (`server.js:88-99`).
- Public submissions, login, gallery API/page, news, and video routes have rate limits.
- Upload middleware restricts file sizes, counts, extensions/MIME types, and checks signatures.
- EJS unescaped output found by source search is used for trusted template includes; ordinary dynamic values use escaped EJS interpolation.
- Gallery/news search terms are type-checked, bounded, and regex-escaped; list endpoints use bounded database pagination.
- `.env` is ignored by Git and is not tracked in the current index. Its contents and Git history were not inspected.

## Verification performed

- `node --test`: **6 passed, 0 failed**.
- EJS compile check across `views`: **passed**.
- `node --check` across project JavaScript outside dependencies, Git metadata, and uploads: **passed**.
- `npm ls --omit=dev --depth=0`: local production dependency tree resolved.
- `npm audit --omit=dev --json`: **not completed**. The npm advisory endpoint could not be reached from this environment; dependency vulnerability status is therefore unknown. The previous audit report’s dependency result should not be treated as current.

## Scope and limitations

This was a source-level review. It did not start the app or connect to MongoDB, inspect `.env` values, review Git history, upload files, exercise admin routes in a browser, test the deployed proxy/TLS/CDN, run load tests, measure query plans, or verify production backups and data-retention practices. No application code was changed for this audit; this report is the only intended artifact.
