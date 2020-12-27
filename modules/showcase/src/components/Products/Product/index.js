
import numeral from '@packages/numeral';

import { Gallery, Header, Text } from '@ui.packages/kit';
import { selectItems } from '@ui.packages/cart';

import React from 'react';
import types from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';


function Product({ isSale, isHit, uuid, amount, currency, brand, name, gallery, onCart, onView }) {
  const classNameForSale = cn('fas fa-percent', styles['product__sale']);
  const classNameForHit = cn('fas fa-star', styles['product__hit']);
  const classNameForFastView = cn('far fa-eye', styles['product__view']);
  const classNameForCart = cn('fas fa-shopping-cart', styles['product__cart']);

  const cart = useSelector(selectItems);
  const countInCart = cart.filter((item) => (item['uuid'] === uuid)).length;

  const productClassName = cn(styles['product'], {
    [styles['product--in-cart']]: !! countInCart,
  });

  function handleClickCart(event) {
    event.preventDefault();
    event.stopPropagation();

    onCart && onCart();
  }

  function handleClickFastView(event) {
    event.preventDefault();
    onView && onView();
  }

  return (
    <Link className={productClassName} to={`/products/${uuid}`}>
      <div className={styles['product__meta']}>
        {isHit && <span className={classNameForHit} title="хит продаж" />}
        {isSale && <span className={classNameForSale} title="распродажа" />}
      </div>
      <div className={styles['product__description']}>
        <div className={styles['product__uuid']}>
          <Text type="uuid">{ uuid }</Text>
        </div>
        <div className={styles['product__brand']}>
          <Header level={2}>{ brand }</Header>
        </div>
      </div>
      <div className={styles['product__promo']}>
        <Gallery items={gallery} isList={false} valueKey="externalId" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
      </div>
      <div className={styles['product__name']}>
        <Text type={Text.TYPE_COMMENT}>{ name }</Text>
      </div>
      <div className={styles['product__controls']}>
        <span className={classNameForFastView} onClick={(event) => handleClickFastView(event)} />
        <div className={styles['product__amount']}>{ numeral(amount).format() } {currency['value']}</div>
        <span className={classNameForCart} onClick={(event) => handleClickCart(event)}>
          { !! countInCart && <span className={styles['product__count']}>{countInCart}</span>}
        </span>
      </div>
    </Link>
  );
}

Product.propTypes = {
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

Product.defaultProps = {
  isSale: false,
  isHit: false,
  uuid: null,
  cart: [],
  gallery: [],
  amount: 0.00,
  brand: 'None',
  name: 'None',
};

export default Product;
