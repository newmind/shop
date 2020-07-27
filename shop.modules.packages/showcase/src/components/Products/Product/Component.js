
import numeral from '@ui.packages/numeral';
import { Gallery } from '@ui.packages/kit';

import types from 'prop-types';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    isSale: types.bool,
    isHit: types.bool,
    uuid: types.string,
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
    uuid: null,
    cart: [],
    gallery: [],
    amount: 0.00,
    brand: 'None',
    name: 'None',
  };

  _handleClickCart(event) {
    const { onCart } = this.props;

    event.preventDefault();
    onCart && onCart();
  }

  _handleClickFastView(event) {
    const { fastViewProduct } = this.props;

    event.preventDefault();
    fastViewProduct(this.props);
  }

  render() {
    const { isSale, isHit, uuid, amount, currency, cart, brand, name, gallery } = this.props;

    const classNameForSale = cn('fas fa-percent', styles['product__sale']);
    const classNameForHit = cn('fas fa-star', styles['product__hit']);
    const classNameForFastView = cn('far fa-eye', styles['product__view']);
    const classNameForCart = cn('fas fa-shopping-cart', styles['product__cart']);

    const countInCart = cart.filter((item) => (item['uuid'] === uuid)).length;

    const productClassName = cn(styles['product'], {
      [styles['product--in-cart']]: !! countInCart,
    });

    return (
      <Link className={productClassName} to={`/products/${uuid}`}>
        <div className={styles['product__meta']}>
          {isHit && <span className={classNameForHit} title="хит продаж" />}
          {isSale && <span className={classNameForSale} title="распродажа" />}
        </div>
        <div className={styles['product__description']}>
          <span className={styles['product__uuid']}>{ uuid }</span>
          <span className={styles['product__brand']}>{ brand }</span>
        </div>
        <div className={styles['product__promo']}>
          <Gallery items={gallery} isList={false} valueKey="externalId" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
        </div>
        <span className={styles['product__name']}>{ name }</span>
        <div className={styles['product__controls']}>
          <span className={classNameForFastView} onClick={this._handleClickFastView.bind(this)} />
          <div className={styles['product__amount']}>{ numeral(amount).format() } {currency['value']}</div>
          <span className={classNameForCart} onClick={this._handleClickCart.bind(this)}>
            { !! countInCart && <span className={styles['product__count']}>{countInCart}</span>}
          </span>
        </div>
      </Link>
    );
  }
}

export default Component;
