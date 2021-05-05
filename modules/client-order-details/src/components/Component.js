
import React from 'react';

import Information from './Information';
import Products from './Products';
import Status from './Status';

import styles from './default.module.scss';


function OrderDetails() {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['section']}>
        <Products />
      </div>
      <div className={styles['details']}>
        <div className={styles['information']}>
          <Information />
        </div>
        <div className={styles['status']}>
          <Status />
        </div>
      </div>
    </section>
  );
}

export default OrderDetails;
