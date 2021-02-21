
import numeral from '@packages/numeral';

import { Mode } from '@ui.packages/types';
import { Button, Text } from '@ui.packages/kit';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Product from './Product';

import {
  closeCartAction,
  resetCartAction,

  removeProductFromCartAction,

  selectItems,
  selectAmount,
} from '../../ducks/slice';

import styles from './defaults.module.scss';


function List() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const amounts = useSelector(selectAmount);

  function handleRemoveProductFromCart(uuid) {
    dispatch(removeProductFromCartAction(uuid));
  }

  function handleResetCart() {
    dispatch(resetCartAction());
    dispatch(closeCartAction());
  }

  function handleGoToCart() {
    dispatch(closeCartAction());
    navigate(process.env['PUBLIC_URL'] + '/order');
  }

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
        {<Text type={Text.TYPE_BODY}>На сумму: { amounts.map((amount) => numeral(amount[1]).format() + ' ' + amount[2])}</Text>}
      </div>
      <div className={styles['controls']}>
        <Button form={Button.FORM_CONTEXT} onClick={() => handleResetCart()}>Очистить</Button>
        <Button mode={Mode.SUCCESS} onClick={() => handleGoToCart()}>Оформить заказ</Button>
      </div>
    </div>
  );
}

List.propTypes = {};

List.defaultProps = {};

export default List;
