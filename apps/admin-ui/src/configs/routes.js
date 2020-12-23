
const routes = [
  {
    path: '/',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "products" */
      '@modules/products'
    ),
  },
  // {
  //   path: '/products/create',
  //   wrapper: 'Navigate',
  //   module: import(
  //     /* webpackChunkName: "product-modify" */
  //     '@modules/product-modify'
  //   ),
  // },
  // {
  //   path: '/products/:id',
  //   wrapper: 'Navigate',
  //   module: import(
  //     /* webpackChunkName: "product-modify" */
  //     '@modules/product-modify'
  //   ),
  // },
  // {
  //   path: '/orders',
  //   wrapper: 'Navigate',
  //   module: import(
  //     /* webpackChunkName: "orders" */
  //     '@modules/orders'
  //   ),
  // },
  // {
  //   path: '/comments',
  //   wrapper: 'Navigate',
  //   module: import(
  //     /* webpackChunkName: "comments" */
  //     '@modules/comments'
  //   ),
  // },
  // {
  //   path: '/attributes',
  //   wrapper: 'Navigate',
  //   module: import(
  //     /* webpackChunkName: "categories" */
  //     '@modules/attributes'
  //   ),
  // },
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
  // {
  //   path: '/profile',
  //   wrapper: 'Navigate',
  //   module: import(
  //     /* webpackChunkName: "profile" */
  //     '@modules/profile'
  //   ),
  // },
];

export default routes;
