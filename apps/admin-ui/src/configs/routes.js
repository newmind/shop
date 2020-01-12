
export default [
  {
    path: '/',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "products" */
      '@modules.packages/products'
    ),
  },
  {
    path: '/products/create',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "product-modify" */
      '@modules.packages/product-modify'
    ),
  },
  {
    path: '/products/:id',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "product-modify" */
      '@modules.packages/product-modify'
    ),
  },
  {
    path: '/orders',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "orders" */
      '@modules.packages/orders'
    ),
  },
  {
    path: '/categories',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "categories" */
      '@modules.packages/categories'
    ),
  },
  {
    path: '/units',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "units" */
      '@modules.packages/units'
    ),
  },
  {
    path: '/currency',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "currency" */
      '@modules.packages/currencies'
    ),
  },
  {
    path: '/sign-in',
    wrapper: 'Empty',
    module: import(
      /* webpackChunkName: "sign-in" */
      '@modules.packages/sign-in'
    ),
  },
  {
    path: '/profile',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "profile" */
      '@modules.packages/profile'
    ),
  },
];