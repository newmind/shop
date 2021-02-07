
import React from 'react';
import types from 'prop-types';
import { useDispatch } from 'react-redux';

import Product from './Product';

import styles from './default.module.scss';

import { removeProductFromCartAction } from '../../../ducks/slice';


function Products({ fields }) {
  const dispatch = useDispatch();
  const items = fields.getAll();

  function handleDelete(index) {
    const product = fields.get(index);

    dispatch(removeProductFromCartAction(product['uuid']));
    fields.remove(index);
  }

  return (
    <div className={styles['wrapper']}>
      {items.map((item, index) => (
        <div key={item['uuid'] + '_' + index} className={styles['section']}>
          <Product
            {...item}
            onDelete={() => handleDelete(index)}
          />
        </div>
      ))}
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
