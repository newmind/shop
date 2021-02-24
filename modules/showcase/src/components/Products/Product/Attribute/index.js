
import { Text } from '@ui.packages/kit';

import React from 'react';

import styles from './default.module.scss';


export default function Attribute({ name, value, unit }) {
  return (
    <div className={styles['wrapper']}>
      <span className={styles['name']}>
        <Text type={Text.TYPE_BODY}>{ name }</Text>
      </span>
      <span className={styles['value']}>
        <Text>{ value }{ unit ? ' ' + unit : '' }</Text>
      </span>
    </div>
  );
}
