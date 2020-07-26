
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
    path: '/comments',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "comments" */
      '@modules.packages/comments'
    ),
  },
  {
    path: '/attributes',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "categories" */
      '@modules.packages/attributes'
    ),
  },
  {
    path: '/users',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "users" */
      '@modules.packages/users'
    ),
  },
  // {
  //   path: '/currency',
  //   wrapper: 'Composite',
  //   module: import(
  //     /* webpackChunkName: "currency" */
  //     '@modules.packages/currencies'
  //   ),
  // },
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