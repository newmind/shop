
import { Header } from "@ui.packages/kit";

import React from 'react';
import { useSelector } from 'react-redux';

import Product from './Product';

import styles from './default.module.scss';

import { selectOrder } from '../../ducks/slice';


function Products() {
  const order = useSelector(selectOrder);

  if ( ! order['products']) {
    return null;
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header theme="light" level={3}>Товары</Header>
      </div>
      <div className={styles['content']}>
        {order['products'].map((item, index) => (
          <div key={item['uuid'] + '_' + index} className={styles['section']}>
            <Product {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
