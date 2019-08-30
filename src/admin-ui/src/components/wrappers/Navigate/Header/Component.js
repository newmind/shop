
import types from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  static contextTypes = {
    profile: types.object,
  };

  render() {
    const { profile } = this.context;
    return (
      <div className={styles['header']}>
        <div className={styles['header__title']}>
          <div className={styles['logotype']}><i className="fas fa-glasses" />&nbsp;&nbsp;&nbsp;Магазин очков</div>
          <p className={styles['profile']}>{ profile['name'] } {profile['surname']}</p>
          <p className={styles['role']}>Роль: { profile['role'] }</p>
        </div>
      </div>
    );
  }
}

export default Component;
