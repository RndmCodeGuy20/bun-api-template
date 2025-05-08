import { type Context, Hono } from 'hono';

const router = new Hono();

router.get('/', (ctx: Context) => {
  const response = ctx.get('response');
  return response.success(
    {
      timestamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} IST`,
      message: 'To check the health of all services, please visit /health',
    },
    'V1.0 API'
  );
});

export default router;
