import { type Context, Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import {
  errorMiddleware,
  responseMiddleware,
  RouteNotFoundError,
} from '#middlewares';
import apiRoutes from '#api';
import { wLogger } from '#helpers';
import { StatusCodes } from 'http-status-codes';
import { ERROR_CODES } from '#constants';

const app = new Hono();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
};

app.use(cors(corsOptions));
app.use(logger(wLogger));
app.use('*', responseMiddleware);

app.get('/favicon.ico', (ctx: Context) => {
  return ctx.text('');
});

app.route('/api', apiRoutes);

app.get('/', (ctx: Context) => {
  const response = ctx.get('response');
  return response.success({ message: 'Hello World' }, 'Welcome to the app');
});

app.notFound(() => {
  throw new RouteNotFoundError(
    'Route not found',
    {
      info: 'The requested route does not exist',
    },
    StatusCodes.NOT_FOUND,
    ERROR_CODES.NOT_FOUND
  );
});

app.onError(errorMiddleware);
export default app;
