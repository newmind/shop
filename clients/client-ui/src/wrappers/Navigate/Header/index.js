
import { Widget } from "@ui.packages/cart-widget";

import React from 'react';
import { Link } from 'react-router-dom';

import styles from './default.module.scss';


function Header() {
  return (
    <div className={styles['header']}>
      <div className={styles['header__title']}>
        <div className={styles['container']}>
          <Link className={styles['logotype']} to={'/'}><i className="fas fa-hands" />&nbsp;&nbsp;&nbsp;Ваш магазин</Link>
        </div>
      </div>
      <div className={styles['header__cart']}>
        <Widget />
      </div>
    </div>
  );
}

export default Header;
