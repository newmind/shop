
export default [
  {
    path: '/',
    wrapper: 'Navigate',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "stock" */
      /* webpackPrefetch: true */
      '@modules.packages/main'
    ),
  },
  {
    path: '/products',
    wrapper: 'Navigate',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "stock" */
      /* webpackPrefetch: true */
      '@modules.packages/showcase'
      ),
  },
  {
    path: '/products/:id',
    wrapper: 'Navigate',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "stock" */
      /* webpackPrefetch: true */
      '@modules.packages/product'
    ),
  },
  {
    path: '/about',
    wrapper: 'Navigate',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "stock" */
      /* webpackPrefetch: true */
      '@modules.packages/about'
    ),
  },
  {
    path: '/produce',
    wrapper: 'Navigate',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "stock" */
      /* webpackPrefetch: true */
      '@modules.packages/produce'
    ),
  },
  {
    path: '/corner',
    wrapper: 'Navigate',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "stock" */
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
      /* webpackChunkName: "stock" */
      /* webpackPrefetch: true */
      '@modules.packages/order'
    ),
  }
];