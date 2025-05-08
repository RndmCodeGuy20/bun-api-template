import { loggerConfig } from '#helpers';
import type { Context } from 'hono';

export const loggerMiddleware = async (
  c: Context,
  next: () => Promise<void>
) => {
  loggerConfig.log('http', `<-- ${c.req.method} ${c.req.path}`, {
    label: 'api',
  });

  await next();

  loggerConfig.log('http', `--> Response Status: ${c.res.status}`, {
    label: 'api',
  });
};
