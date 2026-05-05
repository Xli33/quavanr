import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';
import { LoadingBar } from 'quasar';

const router = createRouter({
  history: createWebHashHistory(/* import.meta.env.BASE_URL */),
  routes
});

router.beforeEach(() => {
  LoadingBar.start();
});

router.afterEach(() => {
  LoadingBar.stop();
});

export default router;
