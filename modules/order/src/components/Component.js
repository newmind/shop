
import { Breadcrumbs } from '@ui.packages/kit';
import { selectItems } from '@ui.packages/cart';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Empty from "./Empty";
import OrderModify from "./OrderModify";

import styles from './default.module.scss';

import { createOperation } from '../ducks/commands';


function calculateAmount(products) {
  let fullAmount = 0;
  for (let index in products) {
    if (products.hasOwnProperty(index)) {
      const product = products[index];
      fullAmount += product['amount'];
      if ('lens' in product) {
        const lens = product['lens'];
        for (let key in lens) {
          if (lens.hasOwnProperty(key)) {
            const position = lens[key];
            if (position) {
              fullAmount += position['coast'];
            }
          }
        }
      }
    }
  }
  return fullAmount;
}


export default function Order() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  function handleSendOrderData(formData) {
    dispatch(createOperation({
      ...formData,
      amount: calculateAmount(formData['items']),
    }));
  }

  return (
    <section className={styles['wrapper']}>
      <div className={styles['breadcrumbs']}>
        <div className={styles['breadcrumbs__content']}>
          <Breadcrumbs
            items={[
              { title: 'Витрина', href: '/products' },
              { title: `Оформление заказа` },
            ]}
          />
        </div>
      </div>
      <div className={styles['content']}>
        { !! items.length
          ? (
            <OrderModify
              items={items}
              initialValues={{
                items: items,
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
