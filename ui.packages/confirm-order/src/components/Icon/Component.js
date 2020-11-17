
import React from 'react';
import types from 'prop-types';

import { nounDeclension } from '@ui.packages/utils';

import cn from "classnames";
import styles from "./defaults.module.scss";


function Icon({ isOpen, items, openCart, closeCart }) {
  function handleSwitchStateCaretList() {
    if (isOpen) {
      closeCart();
    } else {
      openCart();
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

Icon.propTypes = {
  isOpen: types.bool,
  items: types.array,
  openCart: types.func,
  closeCart: types.func,
};

export default Icon;
