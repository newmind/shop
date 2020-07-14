
import numeral from "@ui.packages/numeral";
import { Gallery } from "@ui.packages/kit";

import types from 'prop-types';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from "./default.module.scss";


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

  _handleRemoveFromCart() {
    const { uuid, removeProduct } = this.props;

    removeProduct(uuid);
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
            <Link className={styles['product__brand-link']} to={process.env['PUBLIC_URL'] + `/products/${uuid}`}>{brand}</Link>
            {name && <span className={styles['product__name']}>{ name }</span>}
            {description && <span className={styles['product__description']}>{ description }</span>}
          </h3>
        </div>
      </div>
    );
  }
}

export default Component;
