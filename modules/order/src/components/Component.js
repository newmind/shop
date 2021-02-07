
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Empty from "./Empty";
import OrderModify from "./OrderModify";

import styles from './default.module.scss';

import { selectUuid, selectItems } from '../ducks/slice';
import { createOperation } from '../ducks/commands';


export default function Order() {
  const dispatch = useDispatch();
  const uuid = useSelector(selectUuid);
  const items = useSelector(selectItems);


  function handleSendOrderData(formData) {
    dispatch(createOperation({
      ...formData,
      items: uuid,
    }));
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
                pay: 'cash',
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
