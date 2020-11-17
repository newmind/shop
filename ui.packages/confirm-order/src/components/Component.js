
import types from 'prop-types';
import React from 'react';

import styles from './defaults.module.scss';


function ConfirmOrder({ items }) {
  const hasProductsInCart = !! items.length;

  return hasProductsInCart && (
    <div className={styles['cart']}>
      <span>Перейти к оформлению</span>
    </div>
  );
}

ConfirmOrder.propTypes = {
  items: types.array,
};

ConfirmOrder.defaultProps = {
  items: [],
};


export default ConfirmOrder;
