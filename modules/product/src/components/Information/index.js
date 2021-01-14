
import numeral from '@packages/numeral';

import { nounDeclension } from "@ui.packages/utils";
import { Header, Text, Button, Link } from '@ui.packages/kit';
import { addProductToCart, removeProductFromCart, selectItems } from '@ui.packages/cart';

import React from 'react';
import types from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import cn from "classnames";
import styles from './default.module.scss';

import { selectProduct } from '../../ducks/slice';


function Product({ uuid, brand, name, amount, currency }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectItems);
  const product = useSelector(selectProduct);

  function handleAddToCart() {
    dispatch(addProductToCart(product));
  }

  function handleRemoveFromCart(uuid) {
    dispatch(removeProductFromCart(uuid));
  }

  const countInCart = cart.filter(item => item['uuid'] === uuid).length;
  const removeFromCartClassName= cn(styles['remove'], 'far fa-trash-alt');

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

Product.propTypes = {
  uuid: types.string,
  isSale: types.bool,
  isHit: types.bool,
  amount: types.number,
  saleAmount: types.number,
  currency: types.shape({
    value: types.string,
  }),
  brand: types.string,
  name: types.string,
};

Product.defaultProps = {
  uuid: null,
  isSale: false,
  isHit: false,
  amount: 0.00,
  saleAmount: 0.00,
  currency: {
    value: '',
  },
  brand: 'None',
  name: 'None',
};

export default Product;
