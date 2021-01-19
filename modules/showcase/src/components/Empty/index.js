
import { Text } from '@ui.packages/kit';

import React from 'react';

import styles from './default.module.scss';


export default function Empty() {
  return (
    <div className={styles['wrapper']}>
      <Text type={Text.TYPE_BODY}>Нет товаров по Вашим критериям поиска</Text>
    </div>
  );
}
