
const routes = [
  {
    path: '/',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "products" */
      '@modules/admin-products'
    ),
  },
  {
    path: '/products/create',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "client-product-modify" */
      '@modules/admin-product-modify'
    ),
  },
  {
    path: '/products/:id',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "client-product-modify" */
      '@modules/admin-product-modify'
    ),
  },
  {
    path: '/orders',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "orders" */
      '@modules/admin-orders'
    ),
  },
  {
    path: '/comments',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "comments" */
      '@modules/admin-comments'
    ),
  },
  {
    path: '/options/brands',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "brands" */
      '@modules/admin-brands'
    ),
  },
  {
    path: '/options/types',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "types" */
      '@modules/admin-types'
    ),
  },
  {
    path: '/options/categories',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "categories" */
      '@modules/admin-categories'
    ),
  },
  {
    path: '/options/attributes',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "attributes" */
      '@modules/admin-attributes'
    ),
  },
  {
    path: '/options/units',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "units" */
      '@modules/admin-units'
    ),
  },
  {
    path: '/options/currencies',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "currencies" */
      '@modules/admin-currencies'
    ),
  },
  {
    path: '/gallery',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "gallery" */
      '@modules/admin-gallery'
    ),
  },
  {
    path: '/promotions',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "promotions" */
      '@modules/admin-promotions'
    ),
  },
  {
    path: '/customers',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "customers" */
      '@modules/admin-customers'
    ),
  },
  {
    path: '/shop/payments',
    wrapper: 'Composite',
    module: import(
      /* webpackChunkName: "payments" */
      '@modules/admin-payments'
    ),
  },
  {
    path: '/sign-in',
    wrapper: 'Empty',
    module: import(
      /* webpackChunkName: "sign-in" */
      '@modules/admin-sign-in'
    ),
  },
  {
    path: '/settings',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "settings" */
      '@modules/admin-settings'
    ),
  },
  {
    path: '*',
    wrapper: 'Empty',
    module: import(
      /* webpackChunkName: "client-not-found" */
      '@modules/admin-not-found'
    ),
  },
];

export default routes;
