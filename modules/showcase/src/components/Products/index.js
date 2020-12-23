
import { addProductToCart } from '@ui.packages/cart';
import { nounDeclension, reduceToArray } from "@ui.packages/utils";

import React from 'react';
import types from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Product from './Product';

import { fastViewProduct } from '../../ducks/commands';
import { selectItems, selectMeta } from '../../ducks/slice';

import styles from "./default.module.scss";


const SIZE = 3;


function Products() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const meta = useSelector(selectMeta);

  function handleFastView(product) {
    dispatch(fastViewProduct(product));
  }

  function handleAddToCart(product) {
    dispatch(addProductToCart(product));
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
                      <Product
                        {...product}
                        onCart={() => handleAddToCart(product)}
                        onView={() => handleFastView(product)}
                      />
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
