
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static displayName = 'Loader';

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
