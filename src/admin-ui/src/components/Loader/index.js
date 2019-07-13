
import React, { PureComponent } from 'react';

import styles from './default.module.scss';
import cn from "classnames";


class Component extends PureComponent {
  render() {
    return (
      <div className={styles['wrapper']}>
        <span className={styles['loader']}>
          <div className={styles['container']}>
            <span className={styles['logotype']}>
              <i className={cn('fas fa-glasses', styles['logotype__icon'])} />
              <span className={styles['logotype__text']}>Магазин очков</span>
            </span>
            <p className={styles['spinner']}>Загрузка</p>
          </div>
        </span>
      </div>
    );
  }
}

export default Component;
