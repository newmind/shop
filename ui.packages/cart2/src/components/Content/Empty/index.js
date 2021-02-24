
import { Text } from '@ui.packages/kit';

import React from 'react';

import styles from './defaults.module.scss';


function Empty() {
  return (
    <span className={styles['empty']}>
      <Text>В карзине нет товаров</Text>
    </span>
  );
}

export default Empty;
