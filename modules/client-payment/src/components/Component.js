
import { Header, Text } from '@ui.packages/kit';

import React from 'react';

import styles from './defaul.module.scss';


function Payment() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header theme="light">Оплата</Header>
        </div>
        <div className={styles['line']}>
          <Text theme={'light'}><b>Банковский перевод для юридических лиц.</b> Система автоматичски формирует счет на сформированный покупателем заказ.</Text>
        </div>
        <div className={styles['line']}>
          <Text theme={'light'}>Квитанция банка (форма ПД-4). Отлично подходит для оплаты заказов физическими лицами. Система предложит покупателю скачать или распечатать квитанцию на оплату.</Text>
        </div>
        <div className={styles['line']}>
          <Text theme={'light'}>Платежная система ASSIST. Позволяет оплачивать заказы с помощью банковских карт Visa/MasterCard, Яндекс деньги, со счетов МТС, Билайн, Мегафон, WebMoney, Qiwi. Платежная система предлагает вывод средств на расчетный счет.</Text>
        </div>
        <div className={styles['line']}>
          <Text theme={'light'}>Платежная система Robokassa. Позволяет оплачивать заказы с помощью Webmoney, Яндекс.Деньги, Moneymail, RBK Money, EasyPay, Единый кошелек, LiqPay, WebCreds, Z-Payment, банковских карт Visa/MasterCard, счетов мобильных телефонов, платежных терминалов QIWI, Элекснет, Comepay, и др. Система не требует оплаты за подключение, а взимает фиксированную комиссию с транзакций.</Text>
        </div>
        <div className={styles['line']}>
          <Text theme={'light'}>Лицевой счет. Покупатель может оплатить любой заказ с персонального лицевого счета, имеющегося в интернет-магазине ReadyScript.</Text>
        </div>
        <div className={styles['line']}>
          <Text theme={'light'}>Любому пользователю предоставляется возможность завести свой персональный счет на сайте и пополнять его также с помощью вышеуказанных способов.</Text>
        </div>
        <div className={styles['line']}>
          <Text theme={'light'}>Электронные системы оплат могут автоматически переключать статус заказа и пометку об оплате при поступлении средств.</Text>
        </div>
      </div>
    </div>
  );
}

export default Payment;
