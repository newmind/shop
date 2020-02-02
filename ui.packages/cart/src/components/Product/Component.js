
import types from "prop-types";
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { Gallery } from "@ui.packages/ui";
import numeral from "@ui.packages/numeral";

import cn from "classnames";
import styles from "./defaults.module.scss";


class Component extends PureComponent {
  static propTypes = {
    id: types.number,
    gallery: types.array,
    brand: types.string,
    name: types.string,
    amount: types.number,
    onRemove: types.func,
    closeCart: types.func,
    removeProduct: types.func,
  };

  static defaultProps = {
    id: null,
    gallery: [],
    brand: '',
    name: '',
    amount: 0.00,
  };

  render() {
    const { id, gallery, brand, name, amount, currency, onRemove, closeCart } = this.props;
    const classNameRemoveProduct = cn(styles['remove'], 'far fa-trash-alt');
    return (
      <div className={styles['item']}>
        <div className={styles['item__promo']}>
          <Gallery items={gallery} isList={false} valueKey="id" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
        </div>
        <div className={styles['item__description']}>
          <div className={styles['item__names']}>
            <span className={styles['item__brand']}>
              <Link className={styles['item__brand-link']} to={process.env['PUBLIC_URL'] + `/products/${id}`} onClick={closeCart}>{ brand }</Link>
            </span>
            <p className={styles['item__name']}>{ name }</p>
          </div>
          <div className={styles['item__count']}>
            <p className={styles['item__amount']}>{numeral(amount).format()} {currency['value']}</p>
          </div>
        </div>
        <div className={styles['item__controls']}>
          <span className={classNameRemoveProduct} onClick={onRemove.bind(this, id)} />
        </div>
      </div>
    );
  }
}

export default Component;