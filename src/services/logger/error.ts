import { createLogger } from "./logger";

const logger = createLogger("Error");

export default function errorMiddleware(err, req, res, next) {
  logger.error({ status: err.status, stack: err.stack }, err.message);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.sendStatus(err.status || 500);
}
