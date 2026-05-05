export default [
  {
    path: '/:pathMatch(.*)*',
    name: 'error404',
    meta: {
      title: '404'
    },
    component: () => import('../views/error/404.vue')
  }
];
