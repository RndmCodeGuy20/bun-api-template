import type { Context, ErrorHandler } from 'hono';
import { logger } from '#helpers';
import { envConfig } from '#configs';
import { ENVIRONMENTS } from '#constants';

interface MiddlewareError extends Error {
  status: number;
  errorCode: string;
  info?: {
    service: string;
    details: string;
  };
  details?: unknown;
}

export const errorMiddleware: ErrorHandler = (
  error: MiddlewareError,
  ctx: Context
) => {
  const response = ctx.get('response');
  const body = ctx.req.valid('json');
  // const connInfo = getConnInfo(ctx);
  //   const ip = connInfo.remote.address;
  const method = ctx.req.method;
  const path = ctx.req.path;

  // Handle an array of error details if present
  error.details = Array.isArray(error.details)
    ? error.details
        .map((detail: unknown) => {
          return typeof detail === 'object' && 'message' in detail!
            ? detail.message
            : detail;
        })
        .join(', ')
    : error.details;

  logger(
    error.status >= 500 ? 'error' : 'warn',
    `${error.message} - ${error.info?.details}`,
    error.info?.service ?? 'ERR',
    {
      body,
      path,
      method,
    },
    {
      errorName: error.name,
      status: error.status,
      ...(envConfig.ENV === ENVIRONMENTS.DEVELOPMENT && {
        details: error.details,
        stack: error.stack,
      }),
    },
    {}
  );

  // Response for client errors (status < 500)
  if (error.status < 500) {
    return response.error(error.message, error.status, error.errorCode, {
      errorName: error.name,
      ...(envConfig.ENV === ENVIRONMENTS.DEVELOPMENT && {
        details: error.info,
        stack: error.stack,
      }),
    });
  }

  // Response for server errors (status >= 500)
  return response.error(
    error.message,
    parseInt(error.status != undefined ? error.status.toString() : '500'),
    error.errorCode,
    {
      errorName: error.name,
      ...(envConfig.ENV === ENVIRONMENTS.DEVELOPMENT && {
        details: error.details,
        stack: error.stack,
      }),
    }
  );
};
