
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './default.module.scss';


export default function Types({ type }) {
  return (
    <div className={styles['wrapper']}>
      <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '?typeId=' + type['id']}>{ type['name'] }</Link>
    </div>
  );
}
