import type { Context } from 'hono';
import { pkgConfig } from '#configs';
import { loggerConfig } from '#helpers';

export const getHealth = async (ctx: Context) => {
  try {
    const response = ctx.get('response');

    const timestamp =
      new Date().toLocaleDateString() +
      ' ' +
      new Date().toLocaleTimeString() +
      ' IST';

    return response.success(
      {
        name: pkgConfig.APP_NAME,
        version: pkgConfig.APP_VERSION,
        timestamp: timestamp,
      },
      {
        info: 'You are on health route all systems active.',
      },
      200
    );
  } catch (err) {
    loggerConfig.log('error', err);
  }
};
