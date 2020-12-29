
import types from 'prop-types';
import React, { PureComponent, lazy, Suspense } from 'react';

import styles from './default.module.scss';


const Product = lazy(() => import(/* webpackChunkName: "details-order.product" */'./Product'));


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
      <Suspense fallback={null}>
        <div className={styles['wrapper']}>
          <h2 className={styles['header']}>Ваш заказ</h2>
          <div className={styles['content']}>
            {products.map((product, index) => <Product key={index + '.' + product['product']['uuid']} {...product} />)}
          </div>
        </div>
      </Suspense>
    );
  }
}

export default Component;
