
export default [
  {
    path: '/',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "main-page" */
      /* webpackPreload: true */
      '@modules.packages/main-page'
    ),
  },
  {
    path: '/products',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "showcase" */
      /* webpackPreload: true */
      '@modules.packages/showcase'
    ),
  },
  {
    path: '/products/:id',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "product" */
      /* webpackPreload: true */
      '@modules.packages/product'
    ),
  },
  // {
  //   path: '/about',
  //   wrapper: 'Navigate',
  //   module: import(
  //     /* webpackChunkName: "about" */
  //     '@modules.packages/about'
  //   ),
  // },
  {
    path: '/produce',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "produce" */
      /* webpackPreload: true */
      '@modules.packages/produce'
    ),
  },
  {
    path: '/order',
    removable: true,
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "order" */
      /* webpackPreload: true */
      '@modules.packages/order'
    ),
  },
  {
    path: '/order/:id',
    removable: true,
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "details-order" */
      /* webpackPreload: true */
      '@modules.packages/details-order'
    ),
  }
];