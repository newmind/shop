
import { selectUuid, selectItems } from '@ui.packages/cart-widget';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import OrderModify from "./OrderModify";

import styles from './default.module.scss';

import { createOperation } from '../ducks/commands';


function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uuid = useSelector(selectUuid);
  const items = useSelector(selectItems);

  async function handleSendOrderData(formData) {
    const result = await dispatch(createOperation({
      ...formData,
      items: uuid,
    }));

    if (result) {
      navigate(process.env['PUBLIC_URL'] + '/order/' + result['externalId']);
    }
  }

  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        <OrderModify
          initialValues={{
            items,
            delivery: 'post',
            payment: 'cash',
          }}
          onSubmit={handleSendOrderData}
        />
      </div>
    </section>
  );
}

export default Order;
