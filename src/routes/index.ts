import { type RouteRecordRaw } from 'vue-router';
import error from './error';

const modules = import.meta.glob(['./*.ts', '!./index.ts', '!./error.ts'], {
  eager: true,
  import: 'default'
});
const pages = <RouteRecordRaw[]>Object.values(modules);

console.log(modules);

export default [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  ...pages,
  ...error
];
