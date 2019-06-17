
export default [
  {
    title: 'Витрина',
    path: '/',
    navigate: [
      {
        title: 'Склад',
        path: '/',
      },
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