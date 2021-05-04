
import { Logotype } from '@ui.packages/kit';
import { Widget } from "@ui.packages/cart-widget";

import React from 'react';

import styles from './default.module.scss';


function Header() {
  return (
    <div className={styles['header']}>
      <div className={styles['header__title']}>
        <div className={styles['container']}>
          <Logotype />
        </div>
      </div>
      <div className={styles['header__cart']}>
        <Widget />
      </div>
    </div>
  );
}

export default Header;
