
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { nounDeclension } from '@ui.packages/utils';

import cn from "classnames";
import styles from "./defaults.module.scss";


class Icon extends PureComponent {
  static propTypes = {
    isOpen: types.bool,
    items: types.array,
    openCart: types.func,
    closeCart: types.func,
  };

  _handleSwitchStateCaretList() {
    const { isOpen, openCart, closeCart } = this.props;
    if (isOpen) {
      closeCart();
    } else {
      openCart();
    }
  }

  render() {
    const { isOpen, items } = this.props;
    const classNameCartIcon = cn('fas fa-shopping-cart', styles['cart__icon']);
    const classNameCartWrapper = cn(styles['cart__wrapper'], {
      [styles['cart__wrapper--open']]: isOpen,
    });
    const hasItems = !! items.length;
    return (
      <div className={classNameCartWrapper} onClick={this._handleSwitchStateCaretList.bind(this)}>
        <span className={classNameCartIcon} />
        <span className={styles['cart__info']}>
          <span className={styles['cart__count']}>
            {hasItems ? `${items['length']} ${nounDeclension(items['length'], ['товар', 'товара', 'товаров'])}` : 'пусто'}
          </span>
        </span>
      </div>
    );
  }
}

export default Icon;
