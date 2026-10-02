# Security & Performance Audit

## 1. Application Overview

Server-rendered community campaign site with public content pages, member/contact/inquiry forms, photo/video galleries, and an authenticated administration area. The source tree and route inventory were reviewed in the initial pass. The second pass adds bounded server-side pagination to public and administrative list views, plus regression coverage for selected security controls.

## 2. Technology Stack and Review Boundaries

- Node.js, CommonJS, Express 5, EJS
- MongoDB through Mongoose
- `express-session` with `bcryptjs` password verification
- Multer local uploads and Cloudinary for selected news images
- Vanilla browser JavaScript and CSS

`.env` contents, uploaded media, production database contents, deployed infrastructure, and Git history were not inspected. Application startup was not attempted because startup connects to MongoDB and runs seed/admin initialization.

## 3. Authentication and Authorization

Admin passwords are bcrypt-checked; login regenerates the session and stores a limited admin profile. Logout destroys the session and clears the cookie. Session cookies are HttpOnly, SameSite=Lax, and Secure in production. The default `express-session` in-memory store is not suitable for multi-process or durable production use; deploy with a shared production session store and HTTPS.

All mounted admin groups use authentication middleware at the group or route level. Per the user's explicit policy, `admin` and `superadmin` intentionally have equivalent permissions; the middleware allows both authenticated roles. This review did not add role separation.

## 4. API and Abuse Controls

Public inputs are bounded and validated in the reviewed routes/controllers. Gallery search text is capped and regex-escaped. Rate limits are applied to login, public submissions, gallery API, and public gallery/news/video pages. The limiter is in-process and keyed by `req.ip`; production proxy trust must be configured correctly, and multi-instance deployments need a shared limiter.

## 5. Pagination and Database Access

Public gallery page/API queries and the public video-news list use database-side filtering, count, sort, skip, and limit. The public Kalash video list unwinds the embedded videos in MongoDB, counts the match, then sorts/skips/limits in aggregation; it no longer loads the full embedded array into Node for normal page rendering.

Administrative lists now use bounded page sizes and database-side pagination for gallery, contact messages, inquiries, hero slides, initiatives, notices, video news, and Kalash Yatra videos. The Kalash video manager uses a MongoDB `$slice` projection for the requested embedded-video page. Dashboard/activity sections already use fixed limits. Pagination input and page size are normalized by `utils/pagination.js`; page size is capped at 50 (Kalash admin uses 25, public gallery 24, public videos 9).

Indexes were added for the principal filtered/sort patterns: published gallery sort and district sort; contact status/created date; inquiry type/status/created date; hero and initiative order; notice order/date; and video news updated date. Existing news indexes continue to support published/category/location queries. Indexes have not been built or measured against a production database. MongoDB index builds consume storage and can affect write performance; review deployment behavior before applying to a large live collection.

## 6. Upload Validation

Multer continues to enforce extension/MIME allowlists, size limits (images 8 MB, video 100 MB), and configured file-count limits. A post-upload validator now checks file signatures for supported JPEG, PNG, GIF, WebP, AVIF, MP4/MOV, Matroska/WebM, and OGG paths. Files failing validation are removed and receive a generic 400 response.

Signature checks inspect a short prefix only; they do not fully decode files, validate container structure, scan for malware, or establish that a media file is safe to serve. MP4/MOV share the broad `ftyp` marker and Matroska/WebM share the EBML marker. Treat this as a content-type mismatch defense, not complete media sanitization.

## 7. CSRF and Browser Security

An explicit same-origin check is mounted for `/admin` after session parsing and before admin routes, including the video-news router. Unsafe methods and the legacy GET logout require an Origin or Referer whose HTTP(S) host matches the request Host. Missing, malformed, or foreign origins are rejected. This is a host comparison, not a synchronizer token; reverse-proxy host handling and browser behavior should be validated in the actual deployment. Admin browser forms and upload flows were not exercised end-to-end.

EJS escaped interpolation is used for ordinary values; unescaped EJS output reviewed here is used for template includes. No permissive CORS middleware, server-side `eval`, or shell execution was identified. The app sets `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `X-Frame-Options: SAMEORIGIN`, and disables `X-Powered-By`. CSP is not configured. Enable HSTS at the HTTPS edge after confirming the domain/subdomain policy.

## 8. Errors, Sessions, and External Services

The central Express error response returns a generic message while detailed errors remain in server logs. News upload failures return generic validation text. Logs should be protected and retention reviewed for personal data. Cloudinary credentials are read from environment variables and are not embedded in the frontend. News URL helpers restrict external links to HTTP(S); no server-side fetch of user-supplied URLs was identified. The Cloudinary wrapper does not set an explicit application-level timeout.

## 9. Dependency Audit

A fresh `npm audit --omit=dev --json` completed successfully: zero advisories across 109 production dependencies (108 total dependency entries reported by npm metadata). This applies to the current lockfile and audit time; it does not establish application-code safety.

## 10. Findings and Status

### [HIGH] File signatures are checked, but media is not decoded or scanned

Location: Upload validation middleware

Extension/MIME checks are supplemented with short-prefix signature checks, but this does not establish that files are structurally valid or harmless. Keep uploaded media access constrained, and consider full decoding/re-encoding and malware scanning if the deployment threat model requires it.

Status: PARTIALLY MITIGATED; further media validation is deployment-dependent.

### [MEDIUM] CSRF same-origin behavior needs deployment verification

Location: `middleware/csrfProtection.js`

Unsafe admin methods and legacy GET logout reject absent or foreign Origin/Referer hosts. This does not use a CSRF token, and behavior depends on the deployed proxy/host configuration. Exercise form and upload flows through the production-like proxy before deployment.

Status: IMPLEMENTED; browser/proxy verification remains.

### [MEDIUM] In-process rate limits and session storage do not scale across instances

Location: `middleware/rateLimit.js`, `config/session.js`

Limits and default sessions are process-local. Use a shared limiter and session store for multiple workers/instances; configure trusted proxies to prevent incorrect client IP attribution.

Status: MITIGATED FOR SINGLE PROCESS; deployment configuration remains.

### [MEDIUM] Database pagination and indexes require production validation

Location: public and admin list controllers/models

List queries are bounded and relevant indexes declared. No production data, explain plans, load tests, or index builds were used. Deep skip pagination and the single-document embedded Kalash video array may become inefficient as data grows; consider cursor pagination or normalizing embedded videos if growth justifies it.

Status: IMPLEMENTED; production query performance remains unmeasured.

### [LOW] Browser policy headers are incomplete

CSP and HSTS are not configured. Add a tested CSP and enable HSTS at the HTTPS edge once deployment domains and subdomains are confirmed.

Status: NEEDS DEPLOYMENT CONFIGURATION.

### [LOW] Dependency audit is time-bound

The current audit found no known production dependency advisories. Re-run periodically as dependencies and advisories change.

Status: NO ADVISORIES REPORTED AT AUDIT TIME.

## Second Verification Pass

### Pagination inventory

- Public gallery HTML and JSON: page size 24 and 50 respectively; filtered count and bounded database query.
- Public video news: bounded page size 9; filtering and page selection happen in MongoDB.
- Public Kalash videos: page size 9; count and page data use aggregation, with at most 300 location options returned.
- Admin gallery, contact inbox, inquiries, hero slides, initiatives, notices, and video news: page size 50.
- Admin Kalash videos: page size 25 using `$slice`; activity log query is capped at 50.
- Home page curated content and dashboard panels retain explicit limits.

### Automated checks

- `npm test`: 6 tests passed, covering rate limiting, gallery search/pagination bounds, pagination normalization, CSRF origin checks, equivalent `admin`/`superadmin` access, and upload signature mismatch rejection.
- JavaScript syntax check: 0 failures across project JavaScript files outside dependencies, Git metadata, and uploads.
- EJS compile check: 0 failures across view templates.
- `git diff --check`: passed (Git emitted line-ending normalization notices only).
- `npm audit --omit=dev --json`: 0 advisories across 109 production dependencies.
- No application startup, live database operation, upload request, browser CSRF flow, or load test was run.

## Scope and Limitations

This is a source-level review with database-free tests. It does not certify application security or production readiness. It did not inspect `.env` values, Git history for secrets, live infrastructure, deployed TLS/headers, production database contents, or external account settings. The user's existing homepage and media-rail UI edits were preserved. Production session storage, proxy trust, CSRF behavior, upload decoding/scanning, query plans, index rollout, and dependency audit remain deployment checks.
