
const routes = [
  {
    path: '/',
    wrapper: 'Navigate',
    module: import('@modules/client-main'),
  },
  {
    path: '/products',
    wrapper: 'Navigate',
    module: import('@modules/client-showcase'),
  },
  {
    path: '/products/:id',
    wrapper: 'Navigate',
    module: import('@modules/client-product'),
  },
  {
    path: '/contacts',
    wrapper: 'Navigate',
    module: import('@modules/client-contacts'),
  },
  {
    path: '/client-order',
    wrapper: 'Navigate',
    module: import('@modules/client-order'),
  },
  {
    path: '/client-order/:id',
    wrapper: 'Navigate',
    module: import(
      /* webpackPreload: true */
      /* webpackChunkName: "client-order-details" */
      '@modules/client-order-details'
    ),
  },
  {
    path: '/client-about',
    wrapper: 'Composite',
    module: import(
      /* webpackPreload: true */
      /* webpackChunkName: "client-about" */
      '@modules/client-about'
    ),
  },
  {
    path: '/client-about/delivery',
    wrapper: 'Composite',
    module: import(
      /* webpackPreload: true */
      /* webpackChunkName: "delivery" */
      '@modules/client-delivery'
    ),
  },
  {
    path: '/client-about/payment',
    wrapper: 'Composite',
    module: import(
      /* webpackPreload: true */
      /* webpackChunkName: "payment" */
      '@modules/client-payment'
    ),
  },
  {
    path: '/client-about/refund',
    wrapper: 'Composite',
    module: import(
      /* webpackPreload: true */
      /* webpackChunkName: "refund" */
      '@modules/client-refund'
    ),
  },
  {
    path: '*',
    wrapper: 'Navigate',
    module: import(
      /* webpackPreload: true */
      /* webpackChunkName: "client-not-found" */
      '@modules/client-not-found'
    ),
  }
];

export default routes;
