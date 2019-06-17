
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Cart from '../../../Cart/components';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    return (
      <div className={styles['header']}>
        <div className={styles['header__title']}>
          <Link className={styles['logotype']} to={'/'}><i className="fas fa-glasses" />&nbsp;&nbsp;&nbsp;Магазин очков</Link>
        </div>
        <div className={styles['header__cart']}>
          <Cart />
        </div>
      </div>
    );
  }
}

export default Component;
