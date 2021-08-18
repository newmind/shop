
import { Text } from '@ui.packages/kit';

import React from 'react';
import types from 'prop-types';

import styles from './default.module.scss';


function Shops({ items }) {
  return (
    <div className={styles['wrapper']}>
        {items.map((item) => (
          <div className={styles['shop']}>
            <div className={styles['line']}>
              <div className={styles['name']}>
                <Text type={Text.TYPE_BODY}>{ item['name'] }</Text>
              </div>
              <div className={styles['number']}>
                { !! item['number']
                  ? <Text>в наличии { item['number'] }</Text>
                  : <span className={styles['order']}>нет в наличии</span>
                }
              </div>
            </div>
            <div className={styles['line']}>
              <div className={styles['address']}>
                <Text type={Text.TYPE_COMMENT}>{ item['address'] }</Text>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

Shops.propTypes = {
  items: types.array,
};

Shops.defaultProps = {
  items: [],
};

export default Shops;
