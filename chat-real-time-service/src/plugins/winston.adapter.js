import 'winston-daily-rotate-file';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, errors } = format;
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});
const customLevels = {
  levels: {
    critical: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4
  },
  colors: {
    critical: 'red',
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue'
  }
};

class LoggerAdapter {
  constructor() {
    this.logger = createLogger({
      levels: customLevels.levels,
      level: 'info', // Set the default log level
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }), // to log error stack
        logFormat
      ),
      transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '7d' // Mantener archivos de log por 7 días
        })
      ],
      exceptionHandlers: [
        new transports.File({ filename: 'logs/exceptions.log'})
      ]
    });

  }

  log(level, message) {
    this.logger.log(level, message);
  }

  info(message) {
    this.logger.info(message);
  }

  warn(message) {
    this.logger.warn(message);
  }

  error(message) {
    this.logger.error(message);
  }

  critical(message) {
    this.logger.critical(message);
  }

  debug(message) {
    this.logger.debug(message);
  }
}

export default new LoggerAdapter();