
import numeral from "@ui.packages/numeral";
import { Gallery } from "@ui.packages/kit";

import types from 'prop-types';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from "./default.module.scss";
import {Confirm} from "@ui.packages/dialog";


class Component extends PureComponent {
  static propTypes = {
    uuid: types.string,
    name: types.string,
    brand: types.string,
    gallery: types.array,
    amount: types.number,
    currency: types.object,
    description: types.string,
  };

  static defaultProps = {
    uuid: '',
    name: '',
    brand: '',
    gallery: [],
    amount: 0,
    currency: {},
    description: '',
  };

  _handleCloseConfirmDialog() {
    const { uuid, closeDialog } = this.props;

    closeDialog('remove-confirm-' + uuid);
  }

  _handleRemoveFromCart() {
    const { uuid, openDialog } = this.props;

    openDialog('remove-confirm-' + uuid);
  }

  _handleConfirmRemoveFromCart() {
    const { uuid, removeProduct } = this.props;

    removeProduct(uuid);
    this._handleCloseConfirmDialog();
  }

  render() {
    const { uuid, name, brand, gallery, amount, currency, description } = this.props;

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
          <span className={removeFromCartClassName} onClick={this._handleRemoveFromCart.bind(this)} />
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
          onCancel={this._handleCloseConfirmDialog.bind(this)}
          onConfirm={this._handleConfirmRemoveFromCart.bind(this)}
        />
      </div>
    );
  }
}

export default Component;
