
import numeral from '@packages/numeral';
import { Mode } from "@ui.packages/types";

import { Header, Text, Button, Link } from '@ui.packages/kit';
import { pushNotification } from '@ui.packages/notifications';
import { addProductToCartAction, removeProductFromCartAction, selectUuid } from '@ui.packages/cart-widget';

import types from 'prop-types';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Options from './Options';
import Shops from './Shops';

import cn from "classnames";
import styles from './default.module.scss';


function Product({ uuid, brand, name, price, prevPrice, currency, options, shops }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectUuid);
  const [optionDetail, setOptionDetail] = useState(options.find((item) => item['isTarget']));

  function handleAddToCart() {
    dispatch(addProductToCartAction({ uuid, options: optionDetail }));
    dispatch(pushNotification({
      title: `Товар "${ name }" добавлен в корзину`,
      mode: Mode.SUCCESS,
    }));
  }

  function handleRemoveFromCart() {
    dispatch(removeProductFromCartAction({ uuid, options: optionDetail }));
  }

  const products = cart.filter((item) => item[0] === uuid);
  const count = products.reduce((acc, item) => acc + item[1], 0);

  const removeFromCartClassName= cn(styles['remove'], 'far fa-trash-alt');

  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['name']}>
          <Header level={2}>{ name }</Header>
        </div>
        {name && (
          <div className={styles['brand']}>
            <Text type={Text.TYPE_COMMENT}>{ brand['value'] }</Text>
          </div>
        )}
        <div className={styles['uuid']}>
          <Text type={Text.TYPE_UUID}>Артикул: { uuid }</Text>
        </div>
        <div className={styles['options']}>
          <Options
            value={optionDetail ? optionDetail['id'] : null}
            items={options}
            onChange={(i) => setOptionDetail(i)}
          />
        </div>
        <div className={styles['amount']}>
         <Header type={Text.TYPE_AMOUNT}>{ numeral(price).format() } { currency }</Header>
          {prevPrice && (
            <Text className={styles['prev-amount']} type={Text.TYPE_BODY}>{ numeral(prevPrice).format() } { currency }</Text>
          )}
        </div>
        <div className={styles['controls']}>
          <div className={styles['buttons']}>
            <Button form={Button.FORM_CART} onClick={() => handleAddToCart()} />
          </div>
          { !! count && (
            <div className={styles['cart']}>
              <Link className={styles['to-client-order']} href={'/order'}>{ count } в корзине</Link>
              <span className={removeFromCartClassName} onClick={() => handleRemoveFromCart()} />
            </div>
          )}
        </div>
        { !! shops.length && (
          <div className={styles['available']}>
          <Shops items={shops} />
          </div>
        )}
      </div>
    </div>
  );
}

Product.propTypes = {
  uuid: types.string,
  price: types.number,
  saleAmount: types.number,
  currency: types.string,
  brand: types.object,
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
  brand: null,
  name: 'None',
};

export default Product;
