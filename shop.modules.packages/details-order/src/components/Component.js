
import { Breadcrumbs } from '@ui.packages/kit';

import React, { PureComponent, lazy, Suspense } from 'react';

import styles from './default.module.scss';


const Information = lazy(() => import(/* webpackChunkName: "details-order.information" */'./Information'));
const Status = lazy(() => import(/* webpackChunkName: "details-order.status" */'./Status'));
const Delivery = lazy(() => import(/* webpackChunkName: "details-order.delivery" */'./Delivery'));
const Products = lazy(() => import(/* webpackChunkName: "details-order.products" */'./Products'));


class Component extends PureComponent {
  render() {
    return (
      <Suspense fallback={null}>
        <section className={styles['wrapper']}>
          <div className={styles['breadcrumbs']}>
            <div className={styles['breadcrumbs__content']}>
              <Breadcrumbs
                items={[
                  { title: 'Витрина', href: '/' },
                  { title: 'Информация о заказе' },
                ]}
              />
            </div>
          </div>
          <div className={styles['content']}>
            <div className={styles['information']}>
              <Information />
            </div>
            <div className={styles['status']}>
              <Status />
            </div>
            <div className={styles['delivery']}>
              <Delivery />
            </div>
            <div className={styles['products']}>
              <Products />
            </div>
          </div>
        </section>
      </Suspense>
    );
  }
}

export default Component;
