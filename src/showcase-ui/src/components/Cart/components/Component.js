
import types from 'prop-types';
import React, { PureComponent } from 'react';

import numeral from '@ui.packages/numeral';

import { Gallery, Button } from '@ui.packages/ui';

import Icon from './Icon';

import cn from 'classnames';
import styles from './defaults.module.scss';


class Item extends PureComponent {
  static propTypes = {
    id: types.number,
    gallery: types.array,
    brand: types.string,
    name: types.string,
    amount: types.number,
    onRemove: types.func,
  };

  static defaultProps = {
    id: null,
    gallery: [],
    brand: '',
    name: '',
    amount: 0.00,
  };

  render() {
    const { id, product: { gallery, brand, name }, amount, currency, onRemove } = this.props;
    const classNameRemoveProduct = cn(styles['remove'], 'far fa-trash-alt');
    return (
      <div className={styles['item']}>
        <div className={styles['item__promo']}>
          <Gallery items={gallery} isList={false} valueKey="id" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
        </div>
        <div className={styles['item__description']}>
          <div className={styles['item__names']}>
            <p className={styles['item__brand']}>{ brand }</p>
            <p className={styles['item__name']}>{ name }</p>
          </div>
          <div className={styles['item__count']}>
            <p className={styles['item__amount']}>{numeral(amount).format()} {currency['value']}</p>
          </div>
        </div>
        <div className={styles['item__controls']}>
          <span className={classNameRemoveProduct} onClick={onRemove.bind(this, id)} />
        </div>
      </div>
    );
  }
}





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
  }

  componentWillMount() {
    const { getCartFromLocalStorage } = this.props;
    getCartFromLocalStorage();
  }

  componentDidMount() {
    document.addEventListener('click', this._onClick, true);
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
    push('/cart');
  }

  render() {
    const { items, isOpen } = this.props;
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
                        <Item
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
                      <Button onClick={this._handleResetCart.bind(this)}>Отменить</Button>
                      <Button onClick={this._handleGoToCart.bind(this)} mode="success">Перейти к оформлению заказа</Button>
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
