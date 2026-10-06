const buckets = new Map();
let requestsSinceCleanup = 0;
const CLEANUP_INTERVAL_MS = 60 * 1000;
const MAX_BUCKETS = 10000;
const OVERFLOW_KEY = "__rate_limit_capacity__";

function removeExpiredBuckets(now = Date.now()) {
  for (const [address, entry] of buckets) {
    if (now >= entry.resetAt) buckets.delete(address);
  }
}

const cleanupTimer = setInterval(removeExpiredBuckets, CLEANUP_INTERVAL_MS);
cleanupTimer.unref();

function rateLimit({ windowMs, max, message }) {
  return (req, res, next) => {
    const now = Date.now();
    // No trusted proxy is configured in this app. Ignore user-supplied X-Forwarded-For.
    const clientAddress = req.socket?.remoteAddress || "unknown";
    const key = buckets.has(clientAddress) || buckets.size < MAX_BUCKETS - 1
      ? clientAddress
      : OVERFLOW_KEY;
    let bucket = buckets.get(key);

    if (!bucket || now >= bucket.resetAt) {
      bucket = { count: 0, resetAt: now + windowMs };
      buckets.set(key, bucket);
    }

    bucket.count += 1;
    requestsSinceCleanup += 1;
    if (requestsSinceCleanup >= 100) {
      requestsSinceCleanup = 0;
      removeExpiredBuckets(now);
    }

    res.set("RateLimit-Limit", String(max));
    res.set("RateLimit-Remaining", String(Math.max(0, max - bucket.count)));
    res.set("RateLimit-Reset", String(Math.ceil(bucket.resetAt / 1000)));

    if (bucket.count > max) {
      return res.status(429).json({ success: false, message });
    }
    next();
  };
}

module.exports = rateLimit;
