import winston from 'winston';
import { envConfig } from '#configs';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

winston.addColors(winston.config.syslog.colors);

const logTail = new Logtail(envConfig.LOGTAIL_SOURCE_TOKEN!);

const logTailConfig = winston.format((info) => {
  // if (info.req && info.res) {
  //   const sanitizedReq = { ...info.req.body };

  //   const sensitiveFields = ['password'];

  //   sensitiveFields.forEach((field) => {
  //     if (sanitizedReq[field]) {
  //       sanitizedReq[field] = '********';
  //     }
  //   });

  //   info.req = sanitizedReq;
  //   info.res = {
  //       status: info.res.status,
  //       error: info.res.errorName,
  //   }
  // }
  return info;
});

const loggerConfig = winston.createLogger({
  level: 'silly',
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
  defaultMeta: { service: 'main' },
  transports: [
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: './logs/combined.log' }),
    new LogtailTransport(logTail, {
      format: winston.format.combine(logTailConfig(), winston.format.json()),
    }),
  ],
});

if (envConfig.ENV !== 'production') {
  loggerConfig.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({
          all: true,
          colors: {
            debug: 'blue',
            info: 'green',
            warn: 'yellow',
            error: 'red',
            verbose: 'italic cyan',
            http: 'magenta',
          },
        }),
        winston.format.splat(),
        winston.format.errors({ stack: true }),
        winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
        winston.format.json({
          space: 2,
          replacer: (key, value) => {
            if (key === 'timestamp') {
              return undefined;
            }
            return value;
          },
        }),
        winston.format.printf(
          ({
            timestamp,
            level,
            message,
            label = 'boot',
            stack,
            ...metadata
          }) => {
            let msg = {
              timestamp,
              level,
              message,
              label,
              stack,
            };

            if (metadata) {
              msg = { ...msg, ...metadata };
            }

            if (stack) {
              msg.stack = stack;

              // eslint-disable-next-line max-len
              return `${msg.timestamp} [${msg.level}] ${msg.label ? `(${msg.label})` : ''}: ${msg.message}\n${msg.stack}`;
            }

            return `${msg.timestamp} [${msg.level}] ${msg.label ? `(${msg.label})` : ''}: ${msg.message}`;
          }
        ),
        winston.format.align()
      ),
    })
  );
}

export const logger = (
  level: string,
  message: string,
  label: string,
  req: unknown,
  res: unknown,
  details: object
) => {
  loggerConfig.log(level, message, { label, req, res }, details);
};

export const log = (level: string, message: string, ...meta: unknown[]) => {
  loggerConfig.log(level, message, ...meta);
};

export { loggerConfig };

export const wLogger = (message: string, ...args: string[]) => {
  loggerConfig.log('http', message, { label: 'api' }, args);
};
