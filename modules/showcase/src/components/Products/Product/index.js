
import numeral from '@packages/numeral';

// import { nounDeclension } from "@ui.packages/utils";
import { Gallery, Header, Text, Button, Link } from '@ui.packages/kit';
import { removeProductFromCartAction, selectUuid } from '@ui.packages/cart';

import React from 'react';
import types from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Product({ uuid, price, prevPrice, currency, brand, name, gallery, onCart }) {
  const dispatch = useDispatch();

  const removeFromCartClassName= cn(styles['remove'], 'far fa-trash-alt');

  const cart = useSelector(selectUuid);
  const product = cart.find((item) => (item[0] === uuid));

  function handleRemoveFromCart(uuid, event) {
    event.preventDefault();
    event.stopPropagation();

    dispatch(removeProductFromCartAction(uuid));
  }

  function handleClickCart(event) {
    event.preventDefault();
    event.stopPropagation();

    onCart && onCart();
  }

  // function handleClickFastView(event) {
  //   event.preventDefault();
  //   onView && onView();
  // }

  return (
    <Link className={styles['wrapper']} href={`/products/${uuid}`}>
      <div className={styles['gallery']}>
        <Gallery items={gallery} isList={false} size="middle" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
      </div>
      <div className={styles['common']}>
        <div className={styles['description']}>
          <div className={styles['name']}>
            <Header level={3}>{ name }</Header>
          </div>
          <div className={styles['brand']}>
            <Text type={Text.TYPE_COMMENT}>{ brand }</Text>
          </div>
          <div className={styles['uuid']}>
            <Text type="uuid">Код: { uuid }</Text>
          </div>
        </div>
      </div>
      <div className={styles['information']}>
        <div className={styles['amount']}>
          <Text type={Text.TYPE_AMOUNT}>{ numeral(price).format() } { currency }</Text>
          {prevPrice && (
            <Text className={styles['prev-amount']} type={Text.TYPE_BODY}>{ numeral(prevPrice).format() } { currency }</Text>
          )}
        </div>
        <div className={styles['controls']}>
          <Button form={Button.FORM_BAY} />
          <Button form={Button.FORM_CART} onClick={(event) => handleClickCart(event)} />
          { !! product && (
            <span className={removeFromCartClassName} onClick={(event) => handleRemoveFromCart(uuid, event)} />
          )}
        </div>
        {product && (
          <div className={styles['count']}>
            <Text type={Text.TYPE_COMMENT}>{ product[1] } товар в корзине</Text>
          </div>
        )}
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
