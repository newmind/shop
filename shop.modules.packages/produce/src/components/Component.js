
import React, { PureComponent, lazy, Suspense } from 'react';

import styles from "./default.module.scss";


const Pay = lazy(() => import('./Pay'));
const Making = lazy(() => import('./Making'));
const Contacts = lazy(() => import('./Contacts'));
const Delivery = lazy(() => import('./Delivery'));


class Component extends PureComponent {
  render() {
    return (
      <Suspense fallback={null}>
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
      </Suspense>
    );
  }
}

export default Component;
