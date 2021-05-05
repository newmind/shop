
const routes = [
  {
    path: '/',
    wrapper: 'Navigate',
    module: import('@modules/main-page'),
  },
  {
    path: '/products',
    wrapper: 'Navigate',
    module: import('@modules/showcase'),
  },
  {
    path: '/products/:id',
    wrapper: 'Navigate',
    module: import('@modules/product'),
  },
  {
    path: '/contacts',
    wrapper: 'Navigate',
    module: import('@modules/client-contacts'),
  },
  {
    path: '/order',
    wrapper: 'Navigate',
    module: import('@modules/order'),
  },
  {
    path: '/order/:id',
    wrapper: 'Navigate',
    module: import(
      /* webpackPreload: true */
      /* webpackChunkName: "order-details" */
      '@modules/order-details'
    ),
  },
  {
    path: '/about',
    wrapper: 'Composite',
    module: import(
      /* webpackPreload: true */
      /* webpackChunkName: "about" */
      '@modules/about'
    ),
  },
  {
    path: '/about/delivery',
    wrapper: 'Composite',
    module: import(
      /* webpackPreload: true */
      /* webpackChunkName: "delivery" */
      '@modules/client-delivery'
    ),
  },
  {
    path: '/about/payment',
    wrapper: 'Composite',
    module: import(
      /* webpackPreload: true */
      /* webpackChunkName: "payment" */
      '@modules/client-payment'
    ),
  },
  {
    path: '/about/refund',
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
      /* webpackChunkName: "not-found" */
      '@modules/not-found'
    ),
  }
];

export default routes;
