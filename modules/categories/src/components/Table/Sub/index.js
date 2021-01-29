
import { Actions, Text } from '@ui.packages/kit';

import React from 'react';

import styles from './default.module.scss';


function Sub({ data, onEdit, onDeleted }) {
  return !! data['sub-categories'].length
    ? (
      <div className={styles['wrapper']}>
        {data['sub-categories'].map((item) => (
          <div key={item['id']} className={styles['row']}>
            <span className={styles['value']}>
              <Text>{ item['value'] }</Text>
            </span>
            <span className={styles['description']}>
              <Text type={Text.TYPE_COMMENT}>{ item['description'] }</Text>
            </span>
            <span className={styles['actions']}>
              <Actions onEdit={() => onEdit(item)} onDelete={() => onDeleted(item['id'])} />
            </span>
          </div>
        ))}
      </div>
    )
    : null;
}

export default Sub;
