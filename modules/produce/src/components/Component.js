
import React from 'react';

import Pay from './Pay';
import Making from './Making';
import Contacts from './Contacts';
import Delivery from './Delivery';

import styles from "./default.module.scss";


function Produce() {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        <Contacts />
      </div>
      <div className={styles['content']}>
        <Pay />
      </div>
      <div className={styles['content']}>
        <Delivery />
      </div>
      <div className={styles['content']}>
        <Making />
      </div>
    </section>
  );
}

export default Produce;
