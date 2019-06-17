
import types from 'prop-types';
import React, { PureComponent } from 'react';

import numeral from '@packages/numeral';

import { Link } from 'react-router-dom';

import { Gallery } from '@packages/ui';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    isSale: types.bool,
    isHit: types.bool,
    id: types.number,
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
    gallery: [],
    amount: 0.00,
    brand: 'None',
    name: 'None',
  };

  // _handleClickView(event) {
  //   event.preventDefault();
  //   const { onView } = this.props;
  //   onView && onView();
  // }

  _handleClickCart() {
    const { onCart } = this.props;
    onCart && onCart();
  }

  render() {
    const { isSale, isHit, id, amount, currency, product } = this.props;
    const { brand, name, gallery} = product;
    const classNameForSale = cn('fas fa-percent', styles['product__sale']);
    const classNameForHit = cn('fas fa-star', styles['product__hit']);
    const classNameForCart = cn('fas fa-shopping-cart', styles['product__cart']);
    return (
      <div className={styles['product']}>
        <div className={styles['product__meta']}>
          {isHit && <span className={classNameForHit} title="хит продаж" />}
          {isSale && <span className={classNameForSale} title="распродажа" />}
        </div>
        <div className={styles['product__description']}>
          <span className={styles['product__brand']}>{ brand }</span>
          <span className={styles['product__name']}>{ name }</span>
        </div>
        <div className={styles['product__promo']}>
          <Gallery items={gallery} isList={false} valueKey="file" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
          {/*<span className={styles['product__view']} title="быстрый росмотр" onClick={this._handleClickView.bind(this)}>Быстрый просмотр</span>*/}
        </div>
        <div className={styles['product__amount']}>{ numeral(amount).format() } {currency['value']}</div>
        <div className={styles['product__controls']}>
          <Link className={styles['product__button']} to={`/products/${id}`}>Подробнее</Link>
          <span className={classNameForCart} onClick={this._handleClickCart.bind(this, id)} />
        </div>
      </div>
    );
  }
}

export default Component;
