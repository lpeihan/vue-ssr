import Vue from 'vue';
import App from './app';
import createRouter from './router';

export default () => {
  const router = createRouter();

  const app = new Vue({
    router,
    render: h => h(App)
  });
  return { app, router };
};
