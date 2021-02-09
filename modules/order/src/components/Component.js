
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Empty from "./Empty";
import OrderModify from "./OrderModify";

import styles from './default.module.scss';

import { selectUuid, selectItems } from '../ducks/slice';
import { createOperation } from '../ducks/commands';


export default function Order() {
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
        { !! items.length
          ? (
            <OrderModify
              initialValues={{
                items,
                delivery: 'post',
                payment: 'cash',
              }}
              onSubmit={handleSendOrderData}
            />
          )
          : <Empty />
        }
      </div>
    </section>
  );
}

Order.propTypes = {};

Order.defaultProps = {};
