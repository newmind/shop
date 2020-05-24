
export default [
  {
    path: '/',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "main-page" */
      '@modules.packages/main-page'
    ),
  },
  {
    path: '/products',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "showcase" */
      '@modules.packages/showcase'
    ),
  },
  {
    path: '/products/:id',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "product" */
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
      '@modules.packages/produce'
    ),
  },
  {
    path: '/order',
    removable: true,
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "order" */
      '@modules.packages/order'
    ),
  },
  {
    path: '/order/:id',
    removable: true,
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "details-order" */
      '@modules.packages/details-order'
    ),
  }
];