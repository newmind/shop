
import { Text } from '@ui.packages/kit';
import { reduceToArray } from '@ui.packages/utils';

import React from 'react';
import types from 'prop-types';

import styles from './default.module.scss';


function Properties({ list }) {
  const rows = reduceToArray(list, 2, { fillNull: true });

  return (
    <div className={styles['list']}>
      {rows.map((line, index) => (
        <div key={index} className={styles['list__line']}>
          {line.map((item, index) => (
            <div key={index} className={styles['list__row']}>
              {item && (<>
                <div className={styles['list__col']}>
                  <Text type={Text.TYPE_BODY}>{ item['name'] }:</Text>
                </div>
                <div className={styles['list__col']}>
                  <Text>{ item['value'] } { item['unit'] && item['unit']['value'] }</Text>
                </div>
              </>)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

Properties.propTypes = {
  list: types.array,
};

Properties.defaultProps = {
  list: [],
};

export default Properties;
