
export default [
  // {
  //   path: '/',
  //   wrapper: 'Navigate',
  //   module: import(
  //     /* webpackMode: "lazy" */
  //     /* webpackChunkName: "main" */
  //     /* webpackPrefetch: true */
  //     '@modules.packages/main'
  //   ),
  // },
  {
    // path: '/products',
    path: '/',
    wrapper: 'Navigate',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "products" */
      /* webpackPrefetch: true */
      '@modules.packages/showcase'
      ),
  },
  {
    path: '/products/:id',
    wrapper: 'Navigate',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "product" */
      /* webpackPrefetch: true */
      '@modules.packages/product'
    ),
  },
  // {
  //   path: '/about',
  //   wrapper: 'Navigate',
  //   module: import(
  //     /* webpackMode: "lazy" */
  //     /* webpackChunkName: "about" */
  //     /* webpackPrefetch: true */
  //     '@modules.packages/about'
  //   ),
  // },
  {
    path: '/produce',
    wrapper: 'Navigate',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "produce" */
      /* webpackPrefetch: true */
      '@modules.packages/produce'
    ),
  },
  {
    path: '/corner',
    wrapper: 'Navigate',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "corner" */
      /* webpackPrefetch: true */
      '@modules.packages/corner'
    ),
  },
  {
    path: '/order',
    removable: true,
    wrapper: 'Navigate',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "order" */
      /* webpackPrefetch: true */
      '@modules.packages/order'
    ),
  }
];