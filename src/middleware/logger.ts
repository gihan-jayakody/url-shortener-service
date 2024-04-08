import config from '../config/config';
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: config.node_env === 'production' ? 'info' : 'debug',
  format: format.json(),
  defaultMeta: { service: 'url-shortner-app' },
  transports: [
    //
    // - Write all logs with level of `error` to `error.log`
    // - Write all logs with level of `info` to `status.log`
    //
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/server.log' }),
  ],
  exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })],
});

//
// With this if not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (config.node_env !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

export default logger;
