
import { Widget } from "@ui.packages/cart-widget";
import { Logotype, Search } from '@ui.packages/kit';

import React from 'react';

import styles from './default.module.scss';


function Header() {
  return (
    <div className={styles['header']}>
      <div className={styles['title']}>
        <div className={styles['container']}>
          <Logotype />
        </div>
      </div>
      <div className={styles['controls']}>
        <div className={styles['search']}>
          <Search />
        </div>
        <div className={styles['cart']}>
          <Widget />
        </div>
      </div>
    </div>
  );
}

export default Header;
