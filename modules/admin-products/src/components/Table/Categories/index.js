
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './default.module.scss';


export default function Categories({ category }) {
  return (
    <div className={styles['wrapper']}>
      <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '?categoryId=' + category['id']}>{ category['name'] }</Link>
    </div>
  );
}
