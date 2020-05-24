
import { Breadcrumbs } from '@ui.packages/kit';

// import types from 'prop-types';
import React, { PureComponent } from 'react';

import Information from './Information';
import Status from './Status';
import Delivery from './Delivery';
import Products from './Products';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
  };

  static defaultProps = {
  };

  render() {
    return (
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
    );
  }
}

export default Component;
