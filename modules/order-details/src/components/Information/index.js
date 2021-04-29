
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
            <Text type={'body'}>Номер заказа:</Text>
          </div>
          <div className={styles['value']}>
            <Text>{ order['externalId'] }</Text>
          </div>
        </div>
        <div className={styles['line']}>
          <div className={styles['title']}>
            <Text type={'body'}>Получатель:</Text>
          </div>
          <div className={styles['value']}>
            <Text>{ order['customer'] && order['customer']['name'] }</Text>
          </div>
        </div>
        <div className={styles['line']}>
          <div className={styles['title']}>
            <Text type={'body'}>Способ доставки:</Text>
          </div>
          <div className={styles['value']}>
            <Text>{ order['delivery'] }</Text>
          </div>
        </div>
        <div className={styles['line']}>
          <div className={styles['title']}>
            <Text type={'body'}>Адрес доставки:</Text>
          </div>
          <div className={styles['value']}>
            <Text>{ order['customer'] && order['customer']['address'] }</Text>
          </div>
        </div>
        <div className={styles['line']}>
          <div className={styles['title']}>
            <Text type={'body'}>Дата оформления:</Text>
          </div>
          <div className={styles['value']}>
            <Text>{ moment(order['createdAt']).format('LLLL') }</Text>
          </div>
        </div>
        <div className={styles['line']}>
          <div className={styles['title']}>
            <Text type={'body'}>Сумма заказа:</Text>
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
