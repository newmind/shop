
import numeral from "@packages/numeral";

import { Gallery } from "@ui.packages/kit";

import React from 'react';
import types from "prop-types";

import cn from "classnames";
import styles from "./defaults.module.scss";


function Product({ id, product: { gallery, brand, name }, amount, currency, onRemove }) {
  const classNameRemoveProduct = cn(styles['remove'], 'far fa-trash-alt');

  return (
    <div className={styles['item']}>
      <div className={styles['item__promo']}>
        <Gallery items={ gallery } isList={false} valueKey="externalId" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
      </div>
      <div className={styles['item__description']}>
        <div className={styles['item__names']}>
          <p className={styles['item__brand']}>{ brand }</p>
          <p className={styles['item__name']}>{ name }</p>
        </div>
        <div className={styles['item__count']}>
          <p className={styles['item__amount']}>{ numeral(amount).format() } { currency['value'] }</p>
        </div>
      </div>
      <div className={styles['item__controls']}>
        <span className={classNameRemoveProduct} onClick={() => onRemove(id)} />
      </div>
    </div>
  );
}

Product.propTypes = {
  id: types.number,
  gallery: types.array,
  brand: types.string,
  name: types.string,
  amount: types.number,
  onRemove: types.func,
};

Product.defaultProps = {
  id: null,
  gallery: [],
  brand: '',
  name: '',
  amount: 0.00,
};

export default Product;
