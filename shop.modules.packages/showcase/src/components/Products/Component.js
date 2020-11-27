
import { nounDeclension, reduceToArray } from "@ui.packages/utils";

import types from 'prop-types';
import React, { lazy, Suspense } from 'react';

import styles from "./default.module.scss";


const Product = lazy(() => import(/* webpackChunkName: "showcase.product" */'./Product'));

const SIZE = 3;


function Products({ items, meta, fastViewProduct, addProductToCart }) {
  function handleFastView(product) {
    fastViewProduct(product);
  }

  function handleAddToCart(product) {
    addProductToCart(product);
  }

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
                          onCart={() => handleAddToCart(product)}
                          onView={() => handleFastView(product)}
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

Products.propTypes = {
  items: types.array,
  meta: types.object,
  onAddToCart: types.func,
};

Products.defaultProps = {
  items: [],
  meta: {},
};

export default Products;
