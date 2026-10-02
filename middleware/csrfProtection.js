const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function csrfProtection(req, res, next) {
  const isLogoutGet = req.method === "GET" && req.path === "/logout";
  if (SAFE_METHODS.has(req.method) && !isLogoutGet) return next();

  const expectedHost = req.get("host");
  const originHeader = req.get("origin");
  const refererHeader = req.get("referer");
  let suppliedHost = "";

  try {
    const suppliedUrl = originHeader ? new URL(originHeader) : refererHeader ? new URL(refererHeader) : null;
    if (suppliedUrl && ["http:", "https:"].includes(suppliedUrl.protocol)) suppliedHost = suppliedUrl.host;
  } catch (_) {
    suppliedHost = "";
  }

  if (!expectedHost || !suppliedHost || suppliedHost.toLowerCase() !== expectedHost.toLowerCase()) {
    return res.status(403).send("Request origin could not be verified.");
  }

  next();
}

module.exports = csrfProtection;
