
const routes = [
  {
    path: '/',
    wrapper: 'Navigate',
    module: import(
      /* webpackPreload: true */
      /* webpackChunkName: "main-page" */
      '@modules.packages/main-page'
    ),
  },
  {
    path: '/products',
    wrapper: 'Navigate',
    module: import(
      /* webpackPreload: true */
      /* webpackChunkName: "showcase" */
      '@modules.packages/showcase'
    ),
  },
  {
    path: '/products/:id',
    wrapper: 'Navigate',
    module: import(
      /* webpackPreload: true */
      /* webpackChunkName: "product" */
      '@modules.packages/product'
    ),
  },
  {
    path: '/produce',
    wrapper: 'Navigate',
    module: import(
      /* webpackPreload: true */
      /* webpackChunkName: "produce" */
      '@modules.packages/produce'
    ),
  },
  {
    path: '/order',
    wrapper: 'Navigate',
    module: import(
      /* webpackPreload: true */
      /* webpackChunkName: "order" */
      '@modules.packages/order'
    ),
  },
  // {
  //   path: '/order/:id',
  //   wrapper: 'Navigate',
  //   module: import(
  //     /* webpackPreload: true */
  //     /* webpackChunkName: "order-details" */
  //     '@modules.packages/order-details'
  //   ),
  // },
  {
    path: '*',
    wrapper: 'Empty',
    module: import(
      /* webpackPreload: true */
      /* webpackChunkName: "not-found" */
      '@modules.packages/not-found'
    ),
  }
];

export default routes;
