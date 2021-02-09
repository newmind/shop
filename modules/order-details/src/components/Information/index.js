
import moment from '@packages/moment';
import numeral from '@packages/numeral';

import { Header, Text } from '@ui.packages/kit';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';

import { selectOrder } from '../../ducks/slice';


function Information() {
  const order = useSelector(selectOrder);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header theme="light" level={3}>Информация</Header>
      </div>
      <div className={styles['content']}>
        <div className={styles['line']}>
          <div className={styles['title']}>
            <Header level={3}>Номер заказа:</Header>
          </div>
          <div className={styles['value']}>
            <Text>{ order['externalId'] }</Text>
          </div>
        </div>
        <div className={styles['line']}>
          <div className={styles['title']}>
            <Header level={3}>Получатель:</Header>
          </div>
          <div className={styles['value']}>
            <Text>{ order['customer'] && order['customer']['name'] }</Text>
          </div>
        </div>
        <div className={styles['line']}>
          <div className={styles['title']}>
            <Header level={3}>Способ доставки:</Header>
          </div>
          <div className={styles['value']}>
            <Text>{ order['delivery'] }</Text>
          </div>
        </div>
        <div className={styles['line']}>
          <div className={styles['title']}>
            <Header level={3}>Адрес доставки:</Header>
          </div>
          <div className={styles['value']}>
            <Text>{ order['customer'] && order['customer']['address'] }</Text>
          </div>
        </div>
        <div className={styles['line']}>
          <div className={styles['title']}>
            <Header level={3}>Дата оформления:</Header>
          </div>
          <div className={styles['value']}>
            <Text>{ moment(order['createdAt']).format('LLLL') }</Text>
          </div>
        </div>
        <div className={styles['line']}>
          <div className={styles['title']}>
            <Header level={3}>Сумма заказа:</Header>
          </div>
          <div className={styles['value']}>
            <Text type={Text.TYPE_AMOUNT}>{ numeral(order['price']).format() } { order['currency'] }</Text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
