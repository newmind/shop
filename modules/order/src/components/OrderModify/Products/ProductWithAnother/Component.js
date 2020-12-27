
import numeral from "@packages/numeral";

import { Gallery } from "@ui.packages/kit";
import { Confirm } from "@ui.packages/dialog";

import React from 'react';
import types from 'prop-types';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import styles from "./default.module.scss";


function ProductWithAnother({ uuid, name, brand, gallery, amount, currency, description, closeDialog, openDialog, removeProduct }) {
  function handleCloseConfirmDialog() {
    closeDialog('remove-confirm-' + uuid);
  }

  function handleRemoveFromCart() {
    openDialog('remove-confirm-' + uuid);
  }

  function handleConfirmRemoveFromCart() {
    removeProduct(uuid);
    handleCloseConfirmDialog();
  }

  const removeFromCartClassName= cn(styles['remove'], 'far fa-trash-alt');

  return(
    <div className={styles['product']}>
      <div className={styles['gallery']}>
        <span className={styles['product__uuid']}>{ uuid }</span>
        <div className={styles['gallery__images']}>
          <Gallery items={gallery} valueKey="externalId" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
        </div>
        <div className={styles['amount']}>
          <div className={styles['amount__main']}>
            <span className={styles['amount__value']}>{numeral(amount).format()}</span>
            <span className={styles['amount__currency']}>{currency['value']}</span>
          </div>
        </div>
      </div>
      <div className={styles['content']}>
        <span className={removeFromCartClassName} onClick={() => handleRemoveFromCart()} />
        <h3 className={styles['product__brand']}>
          <Link className={styles['brand']} to={process.env['PUBLIC_URL'] + `/products/${uuid}`}>
            <span className={styles['brand__value']}>{brand}</span>
          </Link>
          {name && <span className={styles['product__name']}>{ name }</span>}
          {description && <span className={styles['product__description']}>{ description }</span>}
        </h3>
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
  description: types.string,
};

ProductWithAnother.defaultProps = {
  uuid: '',
  name: '',
  brand: '',
  gallery: [],
  amount: 0,
  currency: {},
  description: '',
};

export default ProductWithAnother;
