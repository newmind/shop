
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

  render() {
    const { list } = this.props;
    return (
      <div className={styles['list']}>
        {list.map((item, index) => (
          <div key={index} className={styles['list__line']}>
            <div className={styles['list__col']}>{ item['name'] }:</div>
            <div className={styles['list__col']}>{ item['value'] }</div>
          </div>
        ))}
      </div>
    );
  }
}

export default Component;
