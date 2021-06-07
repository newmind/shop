
import numeral from '@packages/numeral';
import { Gallery, Header, Text, Link, Count } from '@ui.packages/kit';
import { closeDialog, Confirm, openDialog } from "@ui.packages/dialog";
import {
  selectUuid,
  selectInProcess,
  removeProductFromCartAction,
  plusQuantityAction,
  minusQuantityAction,
  selectAmount
} from '@ui.packages/cart-widget';

import React from 'react';
import types from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Product({ uuid, price, brand, name, gallery, option }) {
  const dispatch = useDispatch();
  const uuids = useSelector(selectUuid);
  const amounts = useSelector(selectAmount);
  const inProcess = useSelector(selectInProcess);

  const product = uuids.find(item => item[0] === uuid && item[2]['vendor'] === option['vendor']);

  const removeFromCartClassName= cn(styles['remove'], 'far fa-trash-alt');

  function handlePlus() {
    dispatch(plusQuantityAction({ uuid, options: option }));
  }

  function handleMinus() {
    dispatch(minusQuantityAction({ uuid, options: option }));
  }

  function handleConfirmRemove() {
    dispatch(closeDialog('remove-from-cart-client-order' + option['vendor']));
    dispatch(removeProductFromCartAction({ uuid, options: option }));
  }

  function handleRemoveProductFromCart(event) {
    event.preventDefault();
    event.stopPropagation();

    dispatch(openDialog('remove-from-cart-client-order' + option['vendor']));
  }

  function handleCancelRemove() {
    dispatch(closeDialog('remove-from-cart-client-order' + option['vendor']));
  }

  if ( ! product) {
    return null;
  }

  return (
    <div>
      <Link className={styles['wrapper']} href={`/products/${uuid}`}>
        <span className={removeFromCartClassName} onClick={(event) => handleRemoveProductFromCart(event)} />
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
            <div className={styles['option']}>
              <Text type={Text.TYPE_UUID}>Комплектация: { option['name'] }</Text>
            </div>
            <div className={styles['uuid']}>
              <Text type="uuid">Артикул: { option['vendor'] }</Text>
            </div>
          </div>
          <div className={styles['amount']}>
            <div className={styles['price']}>
            <span className={styles['count']}>
              <Count number={product[1]} disabled={inProcess} onPlus={handlePlus} onMinus={handleMinus} />
            </span>
              <span className={styles['number']}>
              <Text type={Text.TYPE_AMOUNT}>x { numeral(price).format() } { amounts.map((amount) => amount[2]) }</Text>
            </span>
            </div>
            <div className={styles['full-price']}>
              <Text type={Text.TYPE_COMMENT}>= { numeral(price * product[1]).format() } { amounts.map((amount) => amount[2]) }</Text>
            </div>
          </div>
        </div>
      </Link>

      <Confirm
        name={'remove-from-cart-client-order' + option['vendor']}
        message={'Вы точно хотите удалить товар из корзины?'}
        onConfirm={() => handleConfirmRemove()}
        onCancel={() => handleCancelRemove()}
      />
    </div>
  );
}

Product.propTypes = {
  uuid: types.string,
  cart: types.array,
  gallery: types.array,
  price: types.number,
  brand: types.string,
  name: types.string,
  onView: types.func,
  onCart: types.func,
};

Product.defaultProps = {
  uuid: null,
  cart: [],
  gallery: [],
  price: 0.00,
  brand: 'None',
  name: 'None',
  onView: null,
  onCart: null,
};
