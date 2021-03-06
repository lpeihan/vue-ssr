import Vue from 'vue';
import App from './app';
import createRouter from './router';
import createStore from './store';
import Meta from 'vue-meta';

Vue.use(Meta);

export default () => {
  const router = createRouter();
  const store = createStore();

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });
  return { app, router, store };
};
