
import { Spinner } from '@ui.packages/kit';

import React from 'react';

import styles from './default.module.scss';


export default function Empty() {
  return (
    <div className={styles['wrapper']}>
      <Spinner />
    </div>
  );
}
