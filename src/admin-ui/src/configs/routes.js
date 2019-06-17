
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
    path: '/recycle',
    wrapper: 'Composite',
    module: 'Recycle',
  },
  {
    path: '/products/create',
    wrapper: 'Composite',
    module: 'ProductModify',
  },
  {
    path: '/products/:id',
    wrapper: 'Composite',
    module: 'ProductModify',
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
];