
export default [
  {
    path: '/',
    wrapper: 'Navigate',
    module: 'Main',
  },
  {
    path: '/products',
    wrapper: 'Navigate',
    module: 'Showcase',
  },
  {
    path: '/products/:id',
    removable: true,
    wrapper: 'Navigate',
    module: 'Product',
  },
  {
    path: '/about',
    wrapper: 'Navigate',
    module: 'About',
  },
  {
    path: '/produce',
    wrapper: 'Navigate',
    module: 'Produce',
  },
  {
    path: '/corner',
    wrapper: 'Navigate',
    module: 'Corner',
  },
  {
    path: '/cart',
    removable: true,
    wrapper: 'Navigate',
    module: 'Cart',
  }
];