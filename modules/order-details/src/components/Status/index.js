
import { Header, Text } from "@ui.packages/kit";

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';

import { selectOrder } from '../../ducks/slice';


const status = {
  100: 'Заказ оформлен',
  110: 'Подтвержден',
  200: 'Оплачен',
  210: 'Сформирован',
  300: 'Отправлен по почте',
  310: 'Передан в курьерскую службу',
  320: 'Ожидает выдачи',
  400: 'Завершон',
  500: 'Отменен',
};


function Status() {
  const order = useSelector(selectOrder);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header theme="light" level={3}>Статус</Header>
      </div>
      <div className={styles['content']}>
        {order['status'] && (
          <Text type={Text.TYPE_BODY}>{ status[order['status']['code']] }</Text>
        )}
      </div>
    </div>
  );
}

export default Status;
