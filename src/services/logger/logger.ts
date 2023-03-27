import bunyan from "bunyan";

export function createLogger(name) {
  return bunyan.createLogger({ name });
}

const logger = createLogger("Server");

export function loggerMiddleware(req, res, next) {
  logger.info({
    method: req.method,
    url: req.url,
    user: req.user,
    status: res.statusCode,
  });
  next();
}
