
import { Mode } from '@ui.packages/types';
import { Header, Text, Status, Button } from "@ui.packages/kit";

import React from 'react';
import { useSelector } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';

import { selectOrder } from '../../ducks/slice';


const status = {
  100: 'Заказ оформлен',
  110: 'Заказ подтвержден',
  200: 'Заказ оплачен',
  210: 'Заказ сформирован',
  300: 'Заказ отправлен по почте',
  310: 'Заказ передан в курьерскую службу',
  320: 'Заказ ожидает в пункте выдачи',
  400: 'Завершон',
  500: 'Отменен',
};


function useStatusMode(code) {
  switch(code) {
    case 100:
    case 110: return Mode.WARNING;
    case 200:
    case 210:
    case 300:
    case 310: return Mode.PRIMARY;
    case 320:
    case 400: return Mode.SUCCESS;
    case 500: return Mode.DANGER;
    default: return Mode.DEFAULT;
  }
}

function StatusBlock() {
  const order = useSelector(selectOrder);
  const statusMode = useStatusMode(order['status'] ? order['status']['code'] : 0);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header theme="light" level={3}>Статус</Header>
      </div>
      <div className={styles['content']}>
        <div className={styles['status']}>
          {order['status'] && (
            <div className={styles['label']}>
              <Status mode={statusMode}>{ status[order['status']['code']] }</Status>
            </div>
          )}
          {order['onlinePayment'] && order['status']['code'] < 200 && (
            <div className={styles['payment']}>
              <Button form={Button.FORM_LINK} mode={Mode.SUCCESS} href={order['onlinePayment']['paymentLink']}>Оплатить</Button>
            </div>
          )}
        </div>
        {order['onlinePayment'] && order['status']['code'] < 200 && (
          <div className={styles['pay']}>
            <Text type={Text.TYPE_BODY}><i className={cn(styles['icon'], "fas fa-exclamation")}/>Чтобы завершить оформление, произведите оплату заказа</Text>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatusBlock;
