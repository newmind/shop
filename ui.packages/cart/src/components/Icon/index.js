
import { nounDeclension } from '@ui.packages/utils';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { openCart, closeCart, selectItems, selectIsOpen } from '../../ducks/cartSlice';

import cn from "classnames";
import styles from "./defaults.module.scss";


function Icon() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen);
  const items = useSelector(selectItems);

  function handleSwitchStateCaretList() {
    if (isOpen) {
      dispatch(closeCart());
    } else {
      dispatch(openCart());
    }
  }

  const classNameCartIcon = cn('fas fa-shopping-cart', styles['cart__icon']);
  const classNameCartWrapper = cn(styles['cart__wrapper'], {
    [styles['cart__wrapper--open']]: isOpen,
  });

  const hasItems = !! items.length;

  return (
    <div className={classNameCartWrapper} onClick={handleSwitchStateCaretList}>
      <span className={classNameCartIcon} />
      <span className={styles['cart__info']}>
        <span className={styles['cart__count']}>
          {hasItems ? `${items['length']} ${nounDeclension(items['length'], ['товар', 'товара', 'товаров'])}` : 'пусто'}
        </span>
      </span>
    </div>
  );
}

export default Icon;
