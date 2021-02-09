
import { nounDeclension } from '@ui.packages/utils';

import React from 'react';
import { useSelector } from 'react-redux';

import {
  selectUuid,
  selectIsOpen,
} from '../../ducks/slice';

import cn from "classnames";
import styles from "./defaults.module.scss";


function Icon() {
  const isOpen = useSelector(selectIsOpen);
  const uuid = useSelector(selectUuid);

  const classNameCartIcon = cn('fas fa-shopping-cart', styles['cart__icon']);
  const classNameCartWrapper = cn(styles['cart__wrapper'], {
    [styles['cart__wrapper--open']]: isOpen,
  });

  const hasItems = uuid.reduce((total, item) => total + item[1], 0);

  return (
    <div className={classNameCartWrapper}>
      <span className={classNameCartIcon} />
      <span className={styles['cart__info']}>
        <span className={styles['cart__count']}>
          { !! hasItems ? `${hasItems} ${nounDeclension(hasItems, ['товар', 'товара', 'товаров'])}` : 'пусто'}
        </span>
      </span>
    </div>
  );
}

export default Icon;
