
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Index extends PureComponent {
  render() {
    return (
      <div className={styles['header']}>
        <div className={styles['header__title']}>
          <span className={styles['logotype']}><i className="fas fa-glasses" />&nbsp;&nbsp;&nbsp;Магазин очков</span>
        </div>
      </div>
    );
  }
}

export default Index;
