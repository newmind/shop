
import numeral from "@packages/numeral";

import { nounDeclension } from "@ui.packages/utils";
import { Button, Header, Text, Link } from "@ui.packages/kit";
import { selectItems, addProductToCartAction, removeProductFromCartAction } from '@ui.packages/cart-widget';

import React from 'react';
import types from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import styles from './default.module.scss';
import cn from "classnames";


export default function Information({ product }) {
  const { uuid, brand, name, amount, currency } = product;

  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  const countInCart = items.filter(item => item['uuid'] === uuid).length;
  const removeFromCartClassName= cn(styles['remove'], 'far fa-trash-alt');

  function handleAddToCart() {
    dispatch(addProductToCartAction(product));
  }

  function handleRemoveFromCart(uuid) {
    dispatch(removeProductFromCartAction(uuid));
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['uuid']}>
        <Text type={Text.TYPE_UUID}>{ uuid }</Text>
      </div>
      <div className={styles['brand']}>
        <Header level={2}>{ brand }</Header>
      </div>
      {name && (
        <div className={styles['name']}>
          <Text type={Text.TYPE_COMMENT}>{ name }</Text>
        </div>
      )}
      <div className={styles['amount']}>
        <Text type={Text.TYPE_AMOUNT}>{ numeral(amount).format() } { currency['value'] }</Text>
      </div>
      <div className={styles['controls']}>
        <div className={styles['buttons']}>
          <Button form={Button.FORM_CART} onClick={() => handleAddToCart()} />
          { !! countInCart && (
            <span className={removeFromCartClassName} onClick={() => handleRemoveFromCart(uuid)} />
          )}
        </div>
        <div className={styles['cart']}>
          { !! countInCart && (<>
            {nounDeclension(countInCart, ['Добавлен', 'Добавлено', 'Добавлено'])}&nbsp;
            {countInCart}&nbsp;
            {nounDeclension(countInCart, ['товар', 'товара', 'товаров'])}.&nbsp;
            <Link className={styles['to-order']} href={'/order'}>Перейти к оформлению заказа</Link>
          </>)}
        </div>
      </div>
    </div>
  );
}

Information.propTypes = {
  product: types.shape({
    uuid: types.string,
    brand: types.string,
    name: types.string,
    amount: types.number,
    currency: types.shape({
      value: types.string,
    }),
  }),
};

Information.defaultProps = {
  product: {
    uuid: '',
    brand: '',
    name: '',
    amount: 0,
    currency: { value: '' },
  },
};
