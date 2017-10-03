import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './ExamplesDocsApp';
import routes from './router.config';
import ZanDoc from 'zan-doc';
import isMobile from './utils/is-mobile';

Vue.use(VueRouter);
Vue.use(ZanDoc);

const routesConfig = routes();

const router = new VueRouter({
  mode: 'hash',
  base: '/zanui/vue/',
  routes: routesConfig
});

router.beforeEach((route, redirect, next) => {
  if (isMobile) {
    window.location.replace('/zanui/vue/examples');
  }
  document.title = route.meta.title || document.title;
  next();
});

router.afterEach(() => {
  window.scrollTo(0, 0);
  Vue.nextTick(() => window.syncPath());
});

window.vueRouter = router;

if (process.env.NODE_ENV !== 'production') {
  Vue.config.productionTip = false;
}

new Vue({ // eslint-disable-line
  render: h => h(App),
  router,
  el: '#app-container'
});
