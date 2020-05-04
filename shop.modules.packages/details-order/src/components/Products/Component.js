
import types from 'prop-types';
import React, { PureComponent } from 'react';

import Product from './Product';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    products: types.array,
  };

  static defaultProps = {
    products: [],
  };

  render() {
    const { products } = this.props;

    return (
      <div className={styles['products']}>
        <h2 className={styles['header']}>Ваш заказ</h2>
        <div className={styles['content']}>
          {products.map((product) => <Product key={product['product']['uuid']} {...product} />)}
        </div>
      </div>
    );
  }
}

export default Component;
