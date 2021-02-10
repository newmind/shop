
import { Text } from '@ui.packages/kit';

import React from 'react';
import { useSelector } from "react-redux";

import styles from './default.module.scss';

import { selectProduct } from "../../ducks/slice";


function Properties() {
  const product = useSelector(selectProduct);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['description']}>
        <Text type={Text.TYPE_COMMENT}>{ product['description'] }</Text>
      </div>
      {product['attributes'].map((item, index) => (
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

Properties.propTypes = {};

Properties.defaultProps = {};

export default Properties;
