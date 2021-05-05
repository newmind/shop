
import { Mode } from "@ui.packages/types";
import numeral from '@packages/numeral';
import { Gallery, Text, Header } from '@ui.packages/kit';
import { pushNotification } from "@ui.packages/notifications";
import { addProductToCartAction, selectUuid } from '@ui.packages/cart-widget';

import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Product({ uuid, name, brand, gallery, price, prevPrice, currency, promotion } ) {
  const dispatch = useDispatch();
  const cart = useSelector(selectUuid);
  const product = cart.find((item) => (item[0] === uuid));

  function handleAddToCart(event) {
    event.preventDefault();
    event.stopPropagation();

    dispatch(addProductToCartAction(uuid));
    dispatch(pushNotification({
      title: 'Товар добавлен в карзину',
      mode: Mode.SUCCESS,
    }));
  }

  return (
    <Link to={process.env['PUBLIC_URL'] + '/products/' + uuid} className={styles['wrapper']}>
      {promotion && (
        <span className={styles['discount']}>{ promotion['percent'] }%</span>
      )}
      <div className={styles['gallery']}>
        <Gallery items={gallery} isList={false} size="middle" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
      </div>
      <div className={styles['information']}>
        <div className={styles['name']}>
          <Header level={4}>{ name }</Header>
        </div>
        <div className={styles['brand']}>
          <Text type={Text.TYPE_COMMENT}>{ brand }</Text>
        </div>
      </div>
      <div className={styles['controls']}>
        <div className={styles['prices']}>
          {prevPrice && (
            <Text className={styles['prev-price']}>{ numeral(prevPrice).format() } { currency }</Text>
          )}
          <Text type={Text.TYPE_AMOUNT}>{ numeral(price).format() } { currency }</Text>
        </div>
        <div className={styles['process']} onClick={(event) => handleAddToCart(event)}>
          {product && (
            <span className={styles['count']}>{ product[1] }</span>
          )}
          <span className={cn(styles['cart'], "fas fa-shopping-cart", { [styles['cart--no-empty']]: !! product })} />
        </div>
      </div>
    </Link>
  );
}
