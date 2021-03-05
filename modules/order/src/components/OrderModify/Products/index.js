
import { createCancelToken } from '@ui.packages/request';
import { Confirm, openDialog, closeDialog } from '@ui.packages/dialog';
import { removeProductFromCartAction, selectUuid, getCart } from '@ui.packages/cart-widget';

import types from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Product from './Product';

import styles from './default.module.scss';


function Products({ fields }) {
  const dispatch = useDispatch();
  const uuid = useSelector(selectUuid);
  const [product, setProduct] = useState(null);
  const items = fields.getAll();


  useEffect(function() {
    const token = createCancelToken();
    dispatch(getCart(uuid, token));
    return () => {
      token.cancel();
    };
  }, [uuid]);

  function handleDelete(index) {
    const product = fields.get(index);
    setProduct({ index, ...product });
    dispatch(openDialog('confirm'));
  }

  function handleApplyConfirm() {
    dispatch(removeProductFromCartAction(product['uuid']));
    dispatch(closeDialog());
    fields.remove(product['index']);
  }

  function handleCancelConfirm() {
    dispatch(closeDialog());
    setProduct(null);
  }

  return (
    <div className={styles['wrapper']}>
      {items.map((item, index) => (
        <div key={item['uuid'] + '_' + index} className={styles['section']}>
          <Product
            {...item}
          />
        </div>
      ))}

      <Confirm
        message={`Вы уверены, что хотите удалить "${product && product['name']}" из корзины?`}
        onConfirm={() => handleApplyConfirm()}
        onCancel={() => handleCancelConfirm()}
      />
    </div>
  );
}

Products.propTypes = {
  fields: types.object,
};

Products.defaultProps = {
  fields: {},
};

export default Products;
