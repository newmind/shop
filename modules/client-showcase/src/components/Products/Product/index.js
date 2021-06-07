
import numeral from '@packages/numeral';

import {Mode} from "@ui.packages/types";
import { nounDeclension } from '@ui.packages/utils';
import {pushNotification} from "@ui.packages/notifications";
import { closeDialog, Confirm, openDialog } from "@ui.packages/dialog";
import { Gallery, Header, Text, Button, Link } from '@ui.packages/kit';
import { addProductToCartAction, removeProductFromCartAction, selectUuid } from '@ui.packages/cart-widget';

import React from 'react';
import types from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import Attribute from "./Attribute";

import cn from 'classnames';
import styles from './default.module.scss';


export default function Product({ uuid, price, prevPrice, currency, brand, name, gallery, characteristics, promotions, options }) {
  const dispatch = useDispatch();

  const cart = useSelector(selectUuid);
  const products = cart.filter((item) => item[0] === uuid);
  const count = products.reduce((acc, item) => acc + item[1], 0);

  function handleClickCart() {
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

  function handleConfirmRemove() {
    dispatch(closeDialog('remove-from-cart-client-showcase' + uuid));
    dispatch(removeProductFromCartAction({ uuid }));
  }

  function handleRemoveProductFromCart(uuid) {
    dispatch(openDialog('remove-from-cart-client-showcase' + uuid));
  }

  function handleCancelRemove() {
    dispatch(closeDialog('remove-from-cart-client-showcase' + uuid));
  }

  const removeFromCartClassName= cn(styles['remove'], 'far fa-trash-alt');

  return (
    <div className={styles['wrapper']}>
      <Link className={styles['product']} href={`/products/${uuid}`}>
        { !! promotions.length && (
          <span className={styles['discount']}>{ promotions.reduce((acc, a) => acc + a['percent'], 0) }%</span>
        )}
        <div className={styles['gallery']}>
          <Gallery items={gallery} isList={false} size="middle" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
        </div>
        <div className={styles['common']}>
          <div className={styles['description']}>
            <div className={styles['name']}>
              <Header level={3}>{ name }</Header>
            </div>
            <div className={styles['brand']}>
              <Text type={Text.TYPE_COMMENT}>{ brand['value'] }</Text>
            </div>
            <div className={styles['uuid']}>
              <Text type="uuid">Артикул: { options.find(item => item['isTarget'])['vendor'] }</Text>
            </div>
            <div className={styles['attrs']}>
              {characteristics.map((char) => char['attributes'].map((attr, index) => <Attribute key={index} {...attr} />))}
            </div>
          </div>
        </div>
      </Link>
      <div className={styles['information']}>
        <div className={styles['container']}>
          <div className={styles['amount']}>
            <Text type={Text.TYPE_AMOUNT}>{ numeral(price).format() } { currency }</Text>
            {prevPrice && (
              <Text className={styles['prev-amount']} type={Text.TYPE_BODY}>{ numeral(prevPrice).format() } { currency }</Text>
            )}
          </div>
          { !! promotions.length && (
            <div className={styles['promotion']}>
              {promotions.map((promotion) => (
                <Text key={promotion['id']} className={styles['nowrap']} type={Text.TYPE_BODY}>{ promotion['name'] }</Text>
              ))}
            </div>
          )}
          <div className={styles['controls']}>
            <Button form={Button.FORM_CART} onClick={(event) => handleClickCart(event)} />
          </div>
        </div>
        { !! count && (
          <div className={styles['count']}>
            <Text type={Text.TYPE_COMMENT}>{ count } { nounDeclension(count, ['товар', 'товара', 'товаров']) } уже в корзине</Text>
            <span className={removeFromCartClassName} onClick={() => handleRemoveProductFromCart(uuid)} />
          </div>
        )}
      </div>

      <Confirm
        name={'remove-from-cart-client-showcase' + uuid}
        message={'Вы точно хотите удалить товар из корзины?'}
        onConfirm={() => handleConfirmRemove()}
        onCancel={() => handleCancelRemove()}
      />
    </div>
  );
}

Product.propTypes = {
  isSale: types.bool,
  isHit: types.bool,
  uuid: types.string,
  cart: types.array,
  gallery: types.array,
  amount: types.number,
  brand: types.object,
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
  brand: null,
  name: 'None',
};
