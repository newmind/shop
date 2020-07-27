
import { nounDeclension, reduceToArray } from "@ui.packages/utils";

import types from 'prop-types';
import React, { PureComponent, lazy, Suspense } from 'react';

import styles from "./default.module.scss";


const Product = lazy(() => import(/* webpackChunkName: "showcase.product" */'./Product'));

const SIZE = 3;


class Component extends PureComponent {
  static propTypes = {
    items: types.array,
    meta: types.object,
    onAddToCart: types.func,
  };

  static defaultProps = {
    items: [],
    meta: {},
  };

  _handleFastView(product) {
    const { fastViewProduct } = this.props;

    fastViewProduct(product);
  }

  _handleAddToCart(product) {
    const { addProductToCart } = this.props;

    addProductToCart(product);
  }

  render() {
    const { items, meta } = this.props;

    const products = reduceToArray(items, SIZE, { fillNull: true });

    return (
      <div className={styles['block']}>
        <h2 className={styles['block__header']}>Найдено {meta['total']} {nounDeclension(meta['total'], ['предложение', 'предложения', 'предложений'])}</h2>
        <div className={styles['block__content']}>
          {products.map((lineWithProducts, index) => {
            return (
              <div key={index} className={styles['block__line']}>
                {lineWithProducts.map((product, index) => {
                  return (
                    <div key={index} className={styles['block__col']}>
                      {product && (
                        <Suspense fallback={null}>
                          <Product
                            {...product}
                            onCart={this._handleAddToCart.bind(this, product)}
                            onView={this._handleFastView.bind(this, product)}
                          />
                        </Suspense>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Component;
