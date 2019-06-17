
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    return (
      <div className={styles['header']}>
        <div className={styles['header__title']}>
          <p><i className="fas fa-glasses" />&nbsp;&nbsp;&nbsp;Магазин очков</p>
        </div>
      </div>
    );
  }
}

export default Component;
