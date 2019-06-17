
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    return (
      <div className={styles['wrapper']}>
        <span className={styles['loader']}>
          <p className={styles['content']}>Загрузка</p>
        </span>
      </div>
    );
  }
}

export default Component;
