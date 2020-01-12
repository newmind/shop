
export default [
  {
    title: 'Витрина',
    path: '/',
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