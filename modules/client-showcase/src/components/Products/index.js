
import { Paging } from "@ui.packages/kit";
import { Mode } from '@ui.packages/types';
import { pushNotification } from '@ui.packages/notifications';
import { addProductToCartAction } from '@ui.packages/cart-widget';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Empty from './Empty';
import Product from './Product';

import { fastViewProduct } from '../../ducks/commands';
import { selectItems, selectMeta, selectInProcess } from '../../ducks/slice';

import styles from "./default.module.scss";


function Products() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const meta = useSelector(selectMeta);
  const inProcess = useSelector(selectInProcess);

  function handleFastView(product) {
    dispatch(fastViewProduct(product));
  }

  function handleAddToCart(product) {
    dispatch(addProductToCartAction(product['uuid']));
    dispatch(pushNotification({
      title: `Товар "${ product['name'] }" добавлен в карзину`,
      mode: Mode.SUCCESS,
    }));
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        { ! meta['total'] && (
          <Empty />
        )}
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
      {(meta['total'] > 12) && (
        <div className={styles['paging']}>
          <Paging total={meta['total']} skip={12} disabled={inProcess} />
        </div>
      )}
    </div>
  );
}

export default Products;
