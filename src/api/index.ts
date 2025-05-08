import { Hono } from 'hono';
import { getHealth } from './health.ts';
import v1 from './v1.0';

const router = new Hono();

router.get('/health', getHealth);
router.route('/v1.0', v1);
router.all('*', (ctx) => {
  return ctx.notFound();
});

export default router;
