
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import numeral from '@packages/numeral';

import { Gallery } from '@packages/ui';

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
          <Gallery items={gallery} isList={false} valueKey="file" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
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

  componentDidMount() {
    document.addEventListener('click', this._onClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._onClick);
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

  _handleSwitchStateCaretList() {
    const { isOpen } = this.props;
    if (isOpen) {
      this._closeCart();
    } else {
      this._openCart();
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

  render() {
    const { items, isOpen } = this.props;
    const hasProductsInCart = !! items.length;
    const fullAmount = this._calculateFullAmount();
    const classNameCartIcon = cn('fas fa-shopping-cart', styles['cart__icon']);
    const classNameCartWrapper = cn(styles['cart__wrapper'], {
      [styles['cart__wrapper--open']]: isOpen,
    });
    return (
      <div ref={this.cartRef} className={styles['cart']}>
        <div className={classNameCartWrapper} onClick={this._handleSwitchStateCaretList.bind(this)}>
          <span className={classNameCartIcon} />
          <span className={styles['cart__count']}>{ items.length }</span>
        </div>
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
                      <Link className={styles['cart__pay']} to={'/cart'} onClick={this._closeCart.bind(this)}>Перейти к оплате</Link>
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
