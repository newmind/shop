
import types from 'prop-types';
import React, { PureComponent } from 'react';

import numeral from '@ui.packages/numeral';
import { Button } from '@ui.packages/ui';

import Icon from './Icon';
import Product from './Product';

import styles from './defaults.module.scss';


class Component extends PureComponent {
  static propTypes = {
    isOpen: types.bool,
    items: types.array,
    openCart: types.func,
    closeCart: types.func,
    getCartFromLocalStorage: types.func,
  };

  static defaultProps = {
    isOpen: true,
    items: [],
  };

  cartRef = React.createRef();

  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);

    document.addEventListener('click', this._onClick, true);
  }

  componentDidMount() {
    const { getCartFromLocalStorage } = this.props;
    getCartFromLocalStorage();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._onClick, true);
  }

  _closeCart() {
    const { closeCart } = this.props;
    closeCart();
  }

  _openCart() {
    const { openCart } = this.props;
    openCart();
  }

  _onClick(event) {
    const target = event.target;
    const { isOpen } = this.props;
    const { current: cartElement } = this.cartRef;

    if (cartElement && target && ! cartElement.contains(target)) {
      isOpen && this._closeCart();
    }
  }

  _calculateFullAmount() {
    const { items } = this.props;
    const fullAmount = items.reduce((accumulator, product) => accumulator + product['amount'], 0);
    return numeral(fullAmount).format();
  }

  _handleRemoveProductFromCart(id) {
    const { removeProduct } = this.props;
    removeProduct(id);
  }

  _handleResetCart() {
    const { closeCart, resetCart } = this.props;
    resetCart();
    closeCart();
  }

  _handleGoToCart() {
    const { closeCart, push } = this.props;
    closeCart();
    push('/order');
  }

  render() {
    const { items, isOpen, match } = this.props;

    if (/order/.test(match['url'])) {
      return null;
    }

    const hasProductsInCart = !! items.length;
    const fullAmount = this._calculateFullAmount();
    return (
      <div ref={this.cartRef} className={styles['cart']}>
        <Icon />
        {isOpen && (
          <div className={styles['cart__list']}>
            <div className={styles['list']}>
              {hasProductsInCart
                ? (
                  <div>
                    <div className={styles['list__content']}>
                      {items.map((item, index) => (
                        <Product
                          key={index}
                          {...item}
                          onRemove={this._handleRemoveProductFromCart.bind(this)}
                        />
                      ))}
                    </div>
                    <div className={styles['list__info']}>
                      <p className={styles['cart__full-amount']}>Итого: { fullAmount } руб.</p>
                    </div>
                    <div className={styles['list__controls']}>
                      <Button onClick={this._handleResetCart.bind(this)}>Очистить</Button>
                      <Button onClick={this._handleGoToCart.bind(this)} mode="success">Оформить заказ</Button>
                    </div>
                  </div>
                )
                : (
                  <span className={styles['cart__empty']}>В карзине нет выбранных товаров</span>
                )
              }
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Component;
