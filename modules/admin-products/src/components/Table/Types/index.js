
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './default.module.scss';


export default function Types({ items }) {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <span className={styles['title']}>Тип товара</span>
      </div>
      <div className={styles['list']}>
        {items.map((item, index) => (
          <div key={index} className={styles['item']}>
            <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '?typeId=' + item['id']}>{ item['name'] }</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
