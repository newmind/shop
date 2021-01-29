
import { Text } from '@ui.packages/kit';

import React from 'react';

import styles from './default.module.scss';


function Sub({ data }) {
  return !! data['categories'].length
    ? (
      <div className={styles['wrapper']}>
        {data['categories'].map((item) => (
          <div key={item['id']} className={styles['row']}>
            <span className={styles['value']}>
              <Text>{ item['value'] }</Text>
            </span>
            <span className={styles['description']}>
              <Text>{ item['description'] }</Text>
            </span>
          </div>
        ))}
      </div>
    )
    : null;
}

export default Sub;
