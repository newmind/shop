
import { Link } from 'react-router-dom';
import React from 'react';

import styles from './default.module.scss';


export default function Header() {
  return (
    <div className={styles['header']}>
      <div className={styles['header__title']}>
        <div className={styles['container']}>
          <Link className={styles['logotype']} to={'/'}><i className="fas fa-glasses" />&nbsp;&nbsp;&nbsp;Магазин очков</Link>
        </div>
      </div>
    </div>
  );
}
