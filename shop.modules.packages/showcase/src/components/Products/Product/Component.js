
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

  _handleClickCart() {
    const { onCart } = this.props;
    onCart && onCart();
  }

  render() {
    const { isSale, isHit, uuid, amount, currency, cart, brand, name, gallery } = this.props;

    const classNameForSale = cn('fas fa-percent', styles['product__sale']);
    const classNameForHit = cn('fas fa-star', styles['product__hit']);
    const classNameForCart = cn('fas fa-shopping-cart', styles['product__cart']);

    const countInCart = cart.filter((item) => (item['uuid'] === uuid)).length;

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
          <span className={styles['product__uuid']}>{ uuid }</span>
          <span className={styles['product__brand']}>{ brand }</span>
          <span className={styles['product__name']}>{ name }</span>
        </div>
        <div className={styles['product__promo']}>
          <Gallery items={gallery} isList={false} valueKey="externalId" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
        </div>
        <div className={styles['product__amount']}>{ numeral(amount).format() } {currency['value']}</div>
        <div className={styles['product__controls']}>
          <Link className={styles['product__button']} to={`/products/${uuid}`}>Подробнее</Link>
          <span className={classNameForCart} onClick={this._handleClickCart.bind(this, uuid)}>
            { !! countInCart && <span className={styles['product__count']}>{countInCart}</span>}
          </span>
        </div>
      </div>
    );
  }
}

export default Component;
