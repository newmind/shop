
export default [
  {
    title: 'Витрина',
    path: '/',
  },
  {
    title: 'Продукты',
    path: '/products',
    navigate: [
      {
        title: 'Продукты',
        path: '/products',
      },
      {
        title: 'Корзина',
        path: '/recycle',
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
];