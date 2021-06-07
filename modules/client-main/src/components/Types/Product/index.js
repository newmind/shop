
import numeral from '@packages/numeral';
import { openDialog } from "@ui.packages/dialog";
import { Gallery, Text, Header } from '@ui.packages/kit';
import { addProductToCartAction, selectUuid } from '@ui.packages/cart-widget';

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';
import {pushNotification} from "@ui.packages/notifications";
import {Mode} from "@ui.packages/types";


export default function Product({ uuid, name, brand, gallery, price, prevPrice, currency, promotions, options }) {
  const dispatch = useDispatch();

  const cart = useSelector(selectUuid);

  const products = cart.filter((item) => item[0] === uuid);
  const count = products.reduce((acc, item) => acc + item[1], 0);

  function handleToCart(event) {
    event.preventDefault();
    event.stopPropagation();

    if (options.length > 1) {
      dispatch(openDialog('fast-view', { uuid }));
    }
    else {
      dispatch(addProductToCartAction({ uuid, options: options[0] }));
      dispatch(pushNotification({
        title: `Товар "${ name }" добавлен в корзину`,
        mode: Mode.SUCCESS,
      }));
    }
  }

  return (
    <Link to={process.env['PUBLIC_URL'] + '/products/' + uuid} className={styles['wrapper']}>
      { !! promotions.length && (
        <span className={styles['discount']}>{ promotions.reduce((acc, a) => acc + a['percent'], 0) }%</span>
      )}
      <div className={styles['gallery']}>
        <Gallery items={gallery} isList={false} size="middle" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
      </div>
      <div className={styles['information']}>
        <div className={styles['name']}>
          <Header level={4}>{ name }</Header>
        </div>
        <div className={styles['brand']}>
          <Text type={Text.TYPE_COMMENT}>{ brand['value'] }</Text>
        </div>
      </div>
      <div className={styles['controls']}>
        <div className={styles['prices']}>
          {prevPrice && (
            <Text className={styles['prev-price']}>{ numeral(prevPrice).format() } { currency }</Text>
          )}
          <Text type={Text.TYPE_AMOUNT}>{ numeral(price).format() } { currency }</Text>
        </div>
        <div className={styles['process']} onClick={(event) => handleToCart(event)}>
          { !! count && (
            <span className={styles['count']}>{ count }</span>
          )}
          <span className={cn(styles['cart'], "fas fa-shopping-cart", { [styles['cart--no-empty']]: !! count })} />
        </div>
      </div>
    </Link>
  );
}
