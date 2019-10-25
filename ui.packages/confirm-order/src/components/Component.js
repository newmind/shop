
import types from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './defaults.module.scss';


class Component extends PureComponent {
  static propTypes = {
    items: types.array,
  };

  static defaultProps = {
    items: [],
  };

  render() {
    const { items } = this.props;
    const hasProductsInCart = !! items.length;
    return hasProductsInCart && (
      <div className={styles['cart']}>
        <span>Перейти к оформлению</span>
      </div>
    );
  }
}

export default Component;
