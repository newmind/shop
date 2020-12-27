
import { Breadcrumbs } from '@ui.packages/kit';
import { selectItems } from '@ui.packages/cart';

import React from 'react';
import { useSelector } from 'react-redux';

import Empty from "./Empty";
import OrderModify from "./OrderModify";

import styles from './default.module.scss';


export default function Order() {
  const items = useSelector(selectItems);

  // function handleSendOrderData(formData) {
  //   createOperation({
  //     ...formData,
  //     amount: calculateFullAmount(formData['items']),
  //   });
  // }

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
