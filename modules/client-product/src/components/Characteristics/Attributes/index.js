
import { Text } from '@ui.packages/kit';

import React from 'react';

import styles from './default.module.scss';


function Attributes({ items }) {
  return (
    <div className={styles['wrapper']}>
      {items.map((item, index) => (
        <div key={index} className={styles['line']}>
          <span className={styles['title']}>
            <Text theme="light" type={Text.TYPE_BODY}>{ item['name'] }:</Text>
          </span>
          <span className={styles['value']}>
            <Text theme="light">{ item['value'] } { item['unit'] }</Text>
          </span>
        </div>
      ))}
    </div>
  );
}

Attributes.propTypes = {};

Attributes.defaultProps = {};

export default Attributes;
