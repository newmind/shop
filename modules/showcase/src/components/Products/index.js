
import { Header } from '@ui.packages/kit';
import { Mode } from '@ui.packages/types';
import { nounDeclension } from "@ui.packages/utils";
import { addProductToCart } from '@ui.packages/cart';
import { pushNotification } from '@ui.packages/notifications';

import React from 'react';
import types from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Product from './Product';

import { fastViewProduct } from '../../ducks/commands';
import { selectItems, selectMeta } from '../../ducks/slice';

import styles from "./default.module.scss";


function Products() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const meta = useSelector(selectMeta);

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
      <div className={styles['header']}>
        <Header level={2}>Найдено {meta['total']} {nounDeclension(meta['total'], ['предложение', 'предложения', 'предложений'])}</Header>
      </div>
      <div className={styles['content']}>
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
