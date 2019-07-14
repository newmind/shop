
import types from 'prop-types';
import React, { PureComponent } from 'react';

import Types from './Types';
import Recipe from './Recipe';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    return (
      <div className={styles['wrapper']}>
        <div className={styles['block']}>
          <h2 className={styles['block__header']}>Тип очков</h2>
          <div className={styles['block__content']}>
            <Types />
          </div>
        </div>
        <div className={styles['block']}>
          <h2 className={styles['block__header']}>Рецепт на очки</h2>
          <div className={styles['block__content']}>
            <Recipe />
          </div>
        </div>
      </div>
    );
  }
}

export default Component;
