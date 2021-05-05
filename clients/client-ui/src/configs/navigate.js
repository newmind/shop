
const navigate = [
  {
    title: 'Каталог',
    path: '/products',
  },
  {
    title: 'Информация для вас',
    path: '/about',
    navigate: [
      {
        title: 'О компании',
        path: '/about',
      },
      null,
      {
        title: 'Дотавка',
        path: '/about/delivery',
      },
      {
        title: 'Оплата',
        path: '/about/payment',
      },
      {
        title: 'Правила возврата',
        path: '/about/refund',
      },
    ]
  },
  {
    title: 'Контакты',
    path: '/contacts',
  },
];

export default navigate;
