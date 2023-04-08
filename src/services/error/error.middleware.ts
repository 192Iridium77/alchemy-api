import { createLogger } from "../logger/logger";

const logger = createLogger("Error");

export default function errorMiddleware(err, req, res, next) {
  logger.error(
    {
      status: err.status,
      stack: err.stack,
      request: {
        method: req.method,
        url: req.url,
        ip: req.ip,
      },
    },
    err.message
  );

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).json({ error: err.message });
}
