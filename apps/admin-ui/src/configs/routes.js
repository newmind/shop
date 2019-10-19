
export default [
  {
    path: '/',
    wrapper: 'Composite',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "stock" */
      /* webpackPrefetch: true */
      '@modules.packages/stock'
    ),
  },
  {
    path: '/products',
    wrapper: 'Composite',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "products" */
      /* webpackPrefetch: true */
      '@modules.packages/products'
    ),
  },
  {
    path: '/sub-products',
    wrapper: 'Composite',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "sub-products" */
      /* webpackPrefetch: true */
      '@modules.packages/sub-products'
    ),
  },
  {
    path: '/products/create',
    wrapper: 'Composite',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "product-modify" */
      /* webpackPrefetch: true */
      '@modules.packages/product-modify'
    ),
  },
  {
    path: '/products/:id',
    wrapper: 'Composite',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "product-modify" */
      /* webpackPrefetch: true */
      '@modules.packages/product-modify'
    ),
  },
  {
    path: '/orders',
    wrapper: 'Navigate',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "orders" */
      /* webpackPrefetch: true */
      '@modules.packages/orders'
    ),
  },
  {
    path: '/categories',
    wrapper: 'Composite',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "categories" */
      /* webpackPrefetch: true */
      '@modules.packages/categories'
    ),
  },
  {
    path: '/units',
    wrapper: 'Composite',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "units" */
      /* webpackPrefetch: true */
      '@modules.packages/units'
    ),
  },
  {
    path: '/currency',
    wrapper: 'Composite',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "currency" */
      /* webpackPrefetch: true */
      '@modules.packages/currencies'
    ),
  },
  {
    path: '/sign-in',
    wrapper: 'Empty',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "sign-in" */
      /* webpackPrefetch: true */
      '@modules.packages/sign-in'
    ),
  },
  {
    path: '/profile',
    wrapper: 'Navigate',
    module: import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "profile" */
      /* webpackPrefetch: true */
      '@modules.packages/profile'
    ),
  },
];