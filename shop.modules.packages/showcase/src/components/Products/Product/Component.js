
import types from 'prop-types';
import React, { PureComponent } from 'react';

import numeral from '@ui.packages/numeral';

import { Link } from 'react-router-dom';

import { Gallery } from '@ui.packages/ui';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    isSale: types.bool,
    isHit: types.bool,
    id: types.number,
    cart: types.array,
    gallery: types.array,
    amount: types.number,
    brand: types.string,
    name: types.string,
    onView: types.func,
    onCart: types.func,
  };

  static defaultProps = {
    isSale: false,
    isHit: false,
    id: null,
    cart: [],
    gallery: [],
    amount: 0.00,
    brand: 'None',
    name: 'None',
  };

  _handleClickCart() {
    const { onCart } = this.props;
    onCart && onCart();
  }

  render() {
    const { isSale, isHit, id, amount, currency, product, cart } = this.props;
    const { brand, name, gallery} = product;
    const classNameForSale = cn('fas fa-percent', styles['product__sale']);
    const classNameForHit = cn('fas fa-star', styles['product__hit']);
    const classNameForCart = cn('fas fa-shopping-cart', styles['product__cart']);

    const countInCart = cart.filter(item => item['id'] === id).length;

    const productClassName = cn(styles['product'], {
      [styles['product--in-cart']]: !! countInCart,
    });

    return (
      <div className={productClassName}>
        <div className={styles['product__meta']}>
          {isHit && <span className={classNameForHit} title="хит продаж" />}
          {isSale && <span className={classNameForSale} title="распродажа" />}
        </div>
        <div className={styles['product__description']}>
          <span className={styles['product__uuid']}>#{ id }</span>
          <span className={styles['product__brand']}>{ brand }</span>
          <span className={styles['product__name']}>{ name }</span>
        </div>
        <div className={styles['product__promo']}>
          <Gallery items={gallery} isList={false} valueKey="id" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
        </div>
        <div className={styles['product__amount']}>{ numeral(amount).format() } {currency['value']}</div>
        <div className={styles['product__controls']}>
          <Link className={styles['product__button']} to={`/products/${id}`}>Подробнее</Link>
          <span className={classNameForCart} onClick={this._handleClickCart.bind(this, id)}>
            { !! countInCart && <span className={styles['product__count']}>{countInCart}</span>}
          </span>
        </div>
      </div>
    );
  }
}

export default Component;
