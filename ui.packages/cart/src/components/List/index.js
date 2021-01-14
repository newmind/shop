
import numeral from '@packages/numeral';

import { Button, Text } from '@ui.packages/kit';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Product from './Product';

import {
  closeCart,
  resetCart,
  removeProductFromCart,
  selectItems,
} from '../../ducks/cartSlice';

import styles from './defaults.module.scss';


function calculateFullAmount(items) {
  const fullAmount = items.reduce((accumulator, product) => accumulator + product['amount'], 0);
  return numeral(fullAmount).format();
}


function List() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  function handleRemoveProductFromCart(id) {
    dispatch(removeProductFromCart(id));
  }

  function handleResetCart() {
    dispatch(resetCart());
    dispatch(closeCart());
  }

  function handleGoToCart() {
    dispatch(closeCart());
    navigate(process.env['PUBLIC_URL'] + '/order');
  }

  const fullAmount = calculateFullAmount(items);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        {items.map((item, index) => (
          <Product
            key={item['uuid'] + '_' + index}
            {...item}
            onRemove={handleRemoveProductFromCart}
          />
        ))}
      </div>
      <div className={styles['info']}>
        <Text type={Text.TYPE_BODY}>На сумму: { fullAmount } руб.</Text>
      </div>
      <div className={styles['controls']}>
        <Button form="context" onClick={handleResetCart}>Очистить</Button>
        <Button onClick={handleGoToCart} mode="success">Оформить заказ</Button>
      </div>
    </div>
  );
}

List.propTypes = {};

List.defaultProps = {};

export default List;
