import type { Context } from 'hono';
import { createMiddleware } from 'hono/factory';
import type { StatusCode } from 'hono/types';

export const responseMiddleware = createMiddleware(
  async (ctx: Context, next) => {
    ctx.set('response', {
      success: (data: object, message = 'Successful', statusCode = 200) => {
        ctx.status(<StatusCode>statusCode);
        return ctx.json({ data, message, status: statusCode });
      },
      fail: (
        message: { string: never },
        data: { never: never },
        errorCode = null,
        statusCode = 400
      ) => {
        ctx.status(statusCode);
        return ctx.json({ data, message, status: statusCode, errorCode });
      },
      error: (
        message: { string: never },
        statusCode = 500,
        errorCode = null,
        data = null
      ) => {
        ctx.status(statusCode);
        return ctx.json({ data, message, status: statusCode, errorCode });
      },
    });

    await next();
  }
);
