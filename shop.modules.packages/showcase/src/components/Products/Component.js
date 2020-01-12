
import { nounDeclension, reduceToArray } from "@ui.packages/utils";

import types from 'prop-types';
import React, { PureComponent } from 'react';

import Product from './Product';

import styles from "./default.module.scss";


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

  render() {
    const { items, meta, onAddToCart } = this.props;
    const products = reduceToArray(items, SIZE);
    return (
      <div className={styles['block']}>
        <h2 className={styles['block__header']}>Найдено {meta['total']} {nounDeclension(meta['total'], ['предложение', 'предложения', 'предложений'])}</h2>
        <div className={styles['block__content']}>
          {products.map((lineWithProducts, index) => {
            return (
              <div key={index} className={styles['block__line']}>
                {lineWithProducts.map((product, index) => {
                  return (
                    <Product
                      key={index}
                      {...product}
                      onCart={onAddToCart.bind(this, product)}
                    />
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
