
export default [
  {
    path: '/',
    wrapper: 'Composite',
    module: 'Stock',
  },
  {
    path: '/products',
    wrapper: 'Composite',
    module: 'Products',
  },
  {
    path: '/sub-products',
    wrapper: 'Composite',
    module: 'SubProducts',
  },
  {
    path: '/recycle',
    wrapper: 'Composite',
    module: 'Recycle',
  },
  {
    path: '/products/create',
    wrapper: 'Composite',
    module: 'ProductModify',
    removable: true,
  },
  {
    path: '/products/:id',
    wrapper: 'Composite',
    module: 'ProductModify',
    removable: true,
  },
  {
    path: '/orders',
    wrapper: 'Navigate',
    module: 'Orders',
  },
  {
    path: '/categories',
    wrapper: 'Composite',
    module: 'Category',
  },
  {
    path: '/units',
    wrapper: 'Composite',
    module: 'Units',
  },
  {
    path: '/currency',
    wrapper: 'Composite',
    module: 'Currency',
  },
  {
    path: '/sign-in',
    wrapper: 'Empty',
    module: 'SignIn',
  },
  {
    path: '/profile',
    wrapper: 'Navigate',
    module: 'Profile',
  },
];