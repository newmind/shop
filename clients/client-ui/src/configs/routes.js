
const routes = [
  {
    path: '/',
    wrapper: 'Navigate',
    module: import('@modules/main-page'),
  },
  {
    path: '/products',
    wrapper: 'Navigate',
    module: import('@modules/showcase'),
  },
  {
    path: '/products/:id',
    wrapper: 'Navigate',
    module: import('@modules/product'),
  },
  {
    path: '/produce',
    wrapper: 'Navigate',
    module: import('@modules/produce'),
  },
  {
    path: '/order',
    wrapper: 'Navigate',
    module: import('@modules/order'),
  },
  {
    path: '/order/:id',
    wrapper: 'Navigate',
    module: import(
      /* webpackPreload: true */
      /* webpackChunkName: "order-details" */
      '@modules/order-details'
    ),
  },
  {
    path: '/about',
    wrapper: 'Navigate',
    module: import(
      /* webpackPreload: true */
      /* webpackChunkName: "about" */
      '@modules/about'
    ),
  },
  {
    path: '*',
    wrapper: 'Navigate',
    module: import(
      /* webpackPreload: true */
      /* webpackChunkName: "not-found" */
      '@modules/not-found'
    ),
  }
];

export default routes;
