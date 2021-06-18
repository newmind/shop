
import { Cart } from '@ui.packages/cart-widget';

import React from 'react';
import { Link } from 'react-router-dom';

import styles from './default.module.scss';


function Component() {
  return (
    <div className={styles['header']}>
      <div className={styles['header__title']}>
        <div className={styles['container']}>
          <Link className={styles['logotype']} to={'/'}><i className="fas fa-circle-notch" />&nbsp;&nbsp;&nbsp;Первый круг</Link>
        </div>
      </div>
      <div className={styles['header__cart']}>
        <Cart />
      </div>
    </div>
  );
}

export default Component;
