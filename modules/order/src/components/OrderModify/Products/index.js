
import React from 'react';
import types from 'prop-types';

import Product from './Product';

import styles from './default.module.scss';


function Products({ fields }) {
  const items = fields.getAll();

  return (
    <div className={styles['wrapper']}>
      {items.map((item, index) => (
        <div key={item['uuid'] + '_' + index} className={styles['section']}>
          <Product
            {...item}
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
