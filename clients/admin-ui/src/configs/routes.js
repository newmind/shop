
const routes = [
  {
    path: '/',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "products" */
      '@modules/products'
    ),
  },
  {
    path: '/products/create',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "product-modify" */
      '@modules/product-modify'
    ),
  },
  {
    path: '/products/:id',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "product-modify" */
      '@modules/product-modify'
    ),
  },
  // {
  //   path: '/orders',
  //   wrapper: 'Navigate',
  //   module: import(
  //     /* webpackChunkName: "orders" */
  //     '@modules/orders'
  //   ),
  // },
  {
    path: '/comments',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "comments" */
      '@modules/comments'
    ),
  },
  {
    path: '/options/brands',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "brands" */
      '@modules/brands'
    ),
  },
  {
    path: '/options/types',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "types" */
      '@modules/types'
    ),
  },
  {
    path: '/options/categories',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "categories" */
      '@modules/categories'
    ),
  },
  {
    path: '/options/attributes',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "attributes" */
      '@modules/attributes'
    ),
  },
  {
    path: '/options/units',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "units" */
      '@modules/units'
    ),
  },
  {
    path: '/options/currencies',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "currencies" */
      '@modules/currencies'
    ),
  },
  {
    path: '/promotions',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "promotions" */
      '@modules/promotions'
    ),
  },
  // {
  //   path: '/users',
  //   wrapper: 'Navigate',
  //   module: import(
  //     /* webpackChunkName: "users" */
  //     '@modules/users'
  //   ),
  // },
  // // {
  // //   path: '/currency',
  // //   wrapper: 'Navigate',
  // //   module: import(
  // //     /* webpackChunkName: "currency" */
  // //     '@modules/currencies'
  // //   ),
  // // },
  {
    path: '/sign-in',
    wrapper: 'Empty',
    module: import(
      /* webpackChunkName: "sign-in" */
      '@modules/sign-in'
    ),
  },
  {
    path: '/profile',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "profile" */
      '@modules/profile'
    ),
  },
  {
    path: '*',
    wrapper: 'Empty',
    module: import(
      /* webpackChunkName: "not-found" */
      '@modules/not-found'
    ),
  }
];

export default routes;
