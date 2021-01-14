
import numeral from '@packages/numeral';

import { Gallery, Header, Text } from '@ui.packages/kit';
import { selectItems } from '@ui.packages/cart';

import React from 'react';
import types from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Product({ isSale, isHit, uuid, amount, currency, brand, name, gallery, onCart, onView }) {
  const classNameForSale = cn('fas fa-percent', styles['sale']);
  const classNameForHit = cn('fas fa-star', styles['hit']);
  const classNameForFastView = cn('far fa-eye', styles['view']);
  const classNameForCart = cn('fas fa-shopping-cart', styles['cart']);

  const cart = useSelector(selectItems);
  const countInCart = cart.filter((item) => (item['uuid'] === uuid)).length;


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
    <Link className={styles['wrapper']} to={`/products/${uuid}`}>
      <div className={styles['meta']}>
        {isHit && <span className={classNameForHit} title="хит продаж" />}
        {isSale && <span className={classNameForSale} title="распродажа" />}
      </div>
      <div className={styles['description']}>
        <div className={styles['uuid']}>
          <Text type="uuid">{ uuid }</Text>
        </div>
        <div className={styles['brand']}>
          <Header level={3}>{ brand }</Header>
        </div>
      </div>
      <div className={styles['promo']}>
        <Gallery items={gallery} isList={false} valueKey="externalId" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
      </div>
      <div className={styles['name']}>
        <Text type={Text.TYPE_COMMENT}>{ name }</Text>
      </div>
      <div className={styles['controls']}>
        <span className={classNameForFastView} onClick={(event) => handleClickFastView(event)} />
        <div className={styles['amount']}>
          <Text type={Text.TYPE_AMOUNT}>{ numeral(amount).format() } {currency['value']}</Text>
        </div>
        <span className={classNameForCart} onClick={(event) => handleClickCart(event)}>
          { !! countInCart && <span className={styles['count']}>{countInCart}</span>}
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
