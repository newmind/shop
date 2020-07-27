
import { reduceToArray } from '@ui.packages/utils';

import types from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    list: types.array,
  };

  static defaultProps = {
    list: [],
  };

  static calculateRows(arr) {
    const newArr = [[], []];
    for (let index in arr) {
      if (arr.hasOwnProperty(index)) {
        newArr[(index % 2 === 0) ? 0 : 1].push(arr[index]);
      }
    }
    return newArr;
  };

  render() {
    const { list } = this.props;

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
}

export default Component;
