
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './default.module.scss';


export default function Types({ category }) {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <span className={styles['title']}>Категория товара</span>
      </div>
      <div className={styles['list']}>
        <div className={styles['item']}>
          <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '?categoryId=' + category['id']}>{ category['name'] }</Link>
        </div>
      </div>
    </div>
  );
}
