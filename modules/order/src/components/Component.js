
import {selectUuid, selectItems, getCart} from '@ui.packages/cart-widget';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import OrderModify from "./OrderModify";
import Empty from "./Empty";

import styles from './default.module.scss';

import { createOperation } from '../ducks/commands';
import {createCancelToken} from "@ui.packages/request";


function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uuid = useSelector(selectUuid);
  const items = useSelector(selectItems);

  useEffect(function() {
    const token = createCancelToken();
    if ( !! uuid.length) {
      dispatch(getCart(uuid, token));
    }
    return () => {
      token.cancel();
    };
  }, [uuid]);

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
        {uuid.length
          ? (
            <OrderModify
              initialValues={{
                items,
                delivery: 'post',
                payment: 'online',
              }}
              onSubmit={handleSendOrderData}
            />
          )
          : (
            <Empty />
          )}
      </div>
    </section>
  );
}

export default Order;
