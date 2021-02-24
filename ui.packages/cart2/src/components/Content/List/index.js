
import numeral from '@packages/numeral';

import { Mode } from '@ui.packages/types';
import { Button, Text } from '@ui.packages/kit';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Product from './Product';

import {
  setStateAction,
  resetCartAction,

  removeProductFromCartAction,

  selectItems,
  selectAmount,
  selectIsOpen,
} from '../../../ducks/slice';

import styles from './defaults.module.scss';


function List() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const isOpen = useSelector(selectIsOpen);
  const amounts = useSelector(selectAmount);

  function handleRemoveProductFromCart(uuid) {
    dispatch(removeProductFromCartAction(uuid));
  }

  function handleResetCart() {
    dispatch(resetCartAction());
    dispatch(setStateAction(false));
  }

  function handleGoToCart() {
    dispatch(setStateAction(false));
    navigate(process.env['PUBLIC_URL'] + '/order');
  }

  return isOpen && (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['list']}>
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
    </div>
  );
}

List.propTypes = {};

List.defaultProps = {};

export default List;
