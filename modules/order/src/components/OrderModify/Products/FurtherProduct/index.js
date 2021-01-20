
import numeral from "@packages/numeral";

import { Gallery, Header, Text } from "@ui.packages/kit";
import { removeProductFromCart } from '@ui.packages/cart';
import { Confirm, openDialog, closeDialog } from "@ui.packages/dialog";

import React from 'react';
import types from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import cn from 'classnames';
import styles from "./default.module.scss";


function ProductWithAnother({ uuid, name, brand, gallery, amount, currency }) {
  const dispatch = useDispatch();

  function handleCloseConfirmDialog() {
    dispatch(closeDialog('remove-confirm-' + uuid));
  }

  function handleRemoveFromCart() {
    dispatch(openDialog('remove-confirm-' + uuid));
  }

  function handleConfirmRemoveFromCart() {
    dispatch(removeProductFromCart(uuid));
    handleCloseConfirmDialog();
  }

  const removeFromCartClassName= cn(styles['remove'], 'far fa-trash-alt');

  return(
    <div className={styles['product']}>
      <div className={styles['gallery']}>
        <Gallery items={gallery} valueKey="externalId" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
      </div>
      <div className={styles['content']}>
        <span className={removeFromCartClassName} onClick={() => handleRemoveFromCart()} />
        <div className={styles['description']}>
          <div className={styles['name']}>
            <Link className={styles['link']} to={process.env['PUBLIC_URL'] + `/products/${uuid}`}>
              <Header level={4}>{ name }</Header>
            </Link>
          </div>
          {name && (
            <div className={styles['brand']}>
              <Text>{ brand }</Text>
            </div>
          )}
          <div className={styles['amount']}>
            <Text type={Text.TYPE_AMOUNT}>{ numeral(amount).format() } {currency['value']}</Text>
          </div>
        </div>
      </div>

      <Confirm
        name={'remove-confirm-' + uuid}
        message="Вы уверены что хотите удалить продукт из карзины?"
        onCancel={() => handleCloseConfirmDialog()}
        onConfirm={() => handleConfirmRemoveFromCart()}
      />
    </div>
  );
}

ProductWithAnother.propTypes = {
  uuid: types.string,
  name: types.string,
  brand: types.string,
  gallery: types.array,
  amount: types.number,
  currency: types.object,
};

ProductWithAnother.defaultProps = {
  uuid: '',
  name: '',
  brand: '',
  gallery: [],
  amount: 0,
  currency: {},
};

export default ProductWithAnother;
