
import React from 'react';

import Information from './Information';
import Products from './Products';
import Status from './Status';

import styles from './default.module.scss';


function OrderDetails() {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['section']}>
        <Status />
      </div>
      <div className={styles['section']}>
        <Information />
      </div>
      <div className={styles['section']}>
        <Products />
      </div>
    </section>
  );
}

export default OrderDetails;
