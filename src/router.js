import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home/home';
import User from '@/views/user/user';

Vue.use(Router);

export default () => {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/user',
        name: 'user',
        component: User
      }
    ]
  });
};
