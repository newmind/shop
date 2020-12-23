
import { reduceToArray } from '@ui.packages/utils';

import types from 'prop-types';
import React from 'react';

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
                  <p className={styles['list__title']}>{ item['name'] }:</p>
                </div>
                <div className={styles['list__col']}>
                  <p className={styles['list__value']}>{ item['value'] } { item['unit'] && item['unit']['value'] }</p>
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
