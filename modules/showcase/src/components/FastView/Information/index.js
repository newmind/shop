
import numeral from "@packages/numeral";

import { nounDeclension } from "@ui.packages/utils";
import { Button, Header, Text, Link } from "@ui.packages/kit";
import { selectItems, addProductToCart, removeProductFromCart } from '@ui.packages/cart';

import React from 'react';
import types from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import styles from './default.module.scss';
import cn from "classnames";


export default function Information({ product }) {
  const { uuid, brand, name, amount, currency, description } = product;

  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  const countInCart = items.filter(item => item['uuid'] === uuid).length;
  const removeFromCartClassName= cn(styles['remove'], 'far fa-trash-alt');

  function handleAddToCart() {
    dispatch(addProductToCart(product));
  }

  function handleRemoveFromCart(uuid) {
    dispatch(removeProductFromCart(uuid));
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['uuid']}>
        <Text type="uuid">{ uuid }</Text>
      </div>
      <div className={styles['brand']}>
        <Header level={2}>{ brand }</Header>
      </div>
      {name && (
        <div className={styles['name']}>
          <Text type="comment">{ name }</Text>
        </div>
      )}
      <div className={styles['amount']}>
        <p className={styles['amount']}>{ numeral(amount).format() } { currency['value'] }</p>
      </div>
      <div className={styles['controls']}>
        <div className={styles['buttons']}>
          <Button form="cart" onClick={() => handleAddToCart()} />
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
      {description && (
        <div className={styles['description']}>
          <div className={styles['header']}>
            <Header level={3}>Описание</Header>
          </div>
          <div className={styles['content']}>
            <Text>{ description }</Text>
          </div>
        </div>)}
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
    description: types.string,
  }),
};

Information.defaultProps = {
  product: {
    uuid: '',
    brand: '',
    name: '',
    amount: 0,
    currency: { value: '' },
    description: '',
  },
};
