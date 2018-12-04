import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home/home';

Vue.use(Router);

export default () => {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      }
    ]
  });
};
