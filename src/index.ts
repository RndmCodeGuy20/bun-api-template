import app from './app.ts';
import { envConfig } from '#configs';
import { loggerConfig } from '#helpers';
// import { sdk } from '#utils';

const init = async () => {
  Bun.serve({
    fetch: app.fetch,
    port: envConfig.PORT,
  });

  loggerConfig.log(
    'verbose',
    `Listening on ${envConfig.HOSTNAME} @ http://localhost:${envConfig.PORT}`
  );

  // sendMail(); // Uncomment this line to send mail
};

const exitHandler = () => {
  if (app) {
    app.delete(() => {
      loggerConfig.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  loggerConfig.log('error', `unexpectedErrorHandler ${error}`);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  loggerConfig.info('SIGTERM received');
  if (app) {
    app.delete();
  }
});

init()
  .then(() => {
    loggerConfig.log('verbose', 'Server started successfully');
  })
  .catch((error) => {
    loggerConfig.error(error);
    process.exit(1);
  });
