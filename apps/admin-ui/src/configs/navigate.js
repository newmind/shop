
const navigate = [
  {
    title: 'Витрина',
    path: '/',
    icon: 'fas fa-shopping-cart',
  },
  {
    title: "Аттрибуты",
    path: '/attributes/types',
    icon: 'fas fa-sliders-h',
    navigate: [
      {
        title: 'Тип',
        path: '/attributes/types',
      },
      {
        title: 'Категория',
        path: '/attributes/categories',
      },
      {
        title: 'Цвет',
        path: '/attributes/colors',
      },
      {
        title: 'Материал',
        path: '/attributes/materials',
      },
      {
        title: 'Форма',
        path: '/attributes/forms',
      },
      {
        title: 'Единица измерения',
        path: '/attributes/units',
      },
      {
        title: 'Валюта',
        path: '/attributes/currencies',
      },
    ],
  },
  {
    title: "Комментарии",
    path: '/comments',
    icon: 'far fa-comments',
  },
  {
    title: "Заказы",
    path: '/orders',
    icon: 'fas fa-search',
  },
  {
    title: "Клиенты",
    path: '/users',
    icon: 'fas fa-users',
  },
  {
    title: "Профайл",
    path: '/profile',
    icon: 'far fa-user-circle',
  },
];

export default navigate;
