
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { nounDeclension } from '@ui.packages/utils';
import numeral from "@ui.packages/numeral";

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

  _calculateFullAmount() {
    const { items } = this.props;
    const fullAmount = items.reduce((accumulator, product) => accumulator + product['amount'], 0);
    return numeral(fullAmount).format();
  }

  render() {
    const { isOpen, items } = this.props;
    const classNameCartIcon = cn('fas fa-shopping-cart', styles['cart__icon']);
    const classNameCartWrapper = cn(styles['cart__wrapper'], {
      [styles['cart__wrapper--open']]: isOpen,
    });
    const hasItems = !! items.length;
    const fullAmount = this._calculateFullAmount();
    return (
      <div className={classNameCartWrapper} onClick={this._handleSwitchStateCaretList.bind(this)}>
        <span className={classNameCartIcon} />
        {hasItems && (
          <span className={styles['cart__info']}>
            <span className={styles['cart__count']}>{items['length']} {nounDeclension(items['length'], ['товар', 'товара', 'товаров'])}</span>
            <span className={styles['cart__amount']}>{fullAmount} руб.</span>
          </span>
        )}
      </div>
    );
  }
}

export default Icon;
