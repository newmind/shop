
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
    path: '/attributes/types',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "types" */
      '@modules/types'
    ),
  },
  {
    path: '/attributes/categories',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "categories" */
      '@modules/categories'
    ),
  },
  {
    path: '/attributes/colors',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "colors" */
      '@modules/colors'
    ),
  },
  {
    path: '/attributes/materials',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "materials" */
      '@modules/materials'
    ),
  },
  {
    path: '/attributes/forms',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "forms" */
      '@modules/forms'
    ),
  },
  {
    path: '/attributes/units',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "units" */
      '@modules/units'
    ),
  },
  {
    path: '/attributes/currencies',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "currencies" */
      '@modules/currencies'
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
