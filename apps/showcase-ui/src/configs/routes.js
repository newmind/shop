
export default [
  // {
  //   path: '/',
  //   wrapper: 'Navigate',
  //   module: import(
  //     /* webpackChunkName: "main" */
  //     '@modules.packages/main'
  //   ),
  // },
  {
    // path: '/products',
    path: '/',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "products" */
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
    path: '/corner',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "corner" */
      '@modules.packages/corner'
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
  }
];