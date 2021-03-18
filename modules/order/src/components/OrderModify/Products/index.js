
import { Confirm, closeDialog } from '@ui.packages/dialog';
import { removeProductFromCartAction } from '@ui.packages/cart-widget';

import types from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Product from './Product';

import styles from './default.module.scss';


function Products({ fields }) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const items = fields.getAll();

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
