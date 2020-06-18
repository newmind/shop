
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    return (
      <div className={styles['footer']}>
        <div className={styles['links']}>
          <span className={styles['links__item']}>
            <Link className={styles['links__link']} to="/corner#pay">Способы оплаты</Link>
          </span>
          <span className={styles['links__item']}>
            <Link className={styles['links__link']} to="/corner#delivery">Доставка и самовывоз</Link>
          </span>
          <span className={styles['links__item']}>
            <Link className={styles['links__link']} to="/corner#return">Обмен и возврат</Link>
          </span>
          <span className={styles['links__item']}>
            <Link className={styles['links__link']} to="/corner#create">Изготовление очков</Link>
          </span>
        </div>
      </div>
    );
  }
}

export default Component;
