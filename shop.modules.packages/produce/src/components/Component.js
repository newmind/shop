
import React, { lazy, Suspense } from 'react';

import styles from "./default.module.scss";


const Pay = lazy(() => import('./Pay'));
const Making = lazy(() => import('./Making'));
const Contacts = lazy(() => import('./Contacts'));
const Delivery = lazy(() => import('./Delivery'));


function Produce() {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        <Suspense fallback={null}>
          <Contacts />
        </Suspense>
      </div>
      <div className={styles['content']}>
        <Suspense fallback={null}>
          <Pay />
        </Suspense>
      </div>
      <div className={styles['content']}>
        <Suspense fallback={null}>
          <Delivery />
        </Suspense>
      </div>
      <div className={styles['content']}>
        <Suspense fallback={null}>
          <Making />
        </Suspense>
      </div>
    </section>
  );
}

export default Produce;
