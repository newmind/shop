
import { Mode } from '@ui.packages/types';
import { addProductToCart } from '@ui.packages/cart';
import { pushNotification } from '@ui.packages/notifications';

import React from 'react';
import types from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Filter from './Filter';
import Product from './Product';

import { fastViewProduct } from '../../ducks/commands';
import { selectItems } from '../../ducks/slice';

import styles from "./default.module.scss";


function Products() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  function handleFastView(product) {
    dispatch(fastViewProduct(product));
  }

  function handleAddToCart(product) {
    dispatch(addProductToCart(product));
    dispatch(pushNotification({
      title: 'Товар добавлен в карзину',
      mode: Mode.SUCCESS,
    }));
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['filter']}>
          <Filter />
        </div>
        <div className={styles['list']}>
          {items.map((product) => (
            <div className={styles['section']} key={product['uuid']}>
              <Product
                {...product}
                onCart={() => handleAddToCart(product)}
                onView={() => handleFastView(product)}
              />
            </div>
          ))}
        </div>
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
