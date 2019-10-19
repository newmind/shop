
export default [
  {
    title: 'Витрина',
    path: '/',
  },
  {
    title: 'Склад',
    path: '/products',
    navigate: [
      {
        title: 'Товары',
        path: '/products',
      },
      {
        title: 'Дополнительные продукты',
        path: '/sub-products',
      }
    ]
  },
  {
    title: "Аттрибуты",
    path: '/categories',
    navigate: [
      {
        title: 'Категории',
        path: '/categories',
      },
      {
        title: 'Единицы измерения',
        path: '/units',
      },
      {
        title: 'Валюта',
        path: '/currency',
      }
    ]
  },
  {
    title: "Заказы",
    path: '/orders',
  },
  {
    title: "Профайл",
    path: '/profile',
  },
];