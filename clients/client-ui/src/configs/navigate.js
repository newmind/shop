
const navigate = [
  {
    title: 'Каталог',
    path: '/products',
  },
  {
    title: 'Информация для вас',
    path: '/client-about',
    navigate: [
      {
        title: 'О компании',
        path: '/client-about',
      },
      null,
      {
        title: 'Дотавка',
        path: '/client-about/delivery',
      },
      {
        title: 'Оплата',
        path: '/client-about/payment',
      },
      {
        title: 'Правила возврата',
        path: '/client-about/refund',
      },
    ]
  },
  {
    title: 'Контакты',
    path: '/contacts',
  },
];

export default navigate;
