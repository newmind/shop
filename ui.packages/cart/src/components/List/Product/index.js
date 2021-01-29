
import numeral from "@packages/numeral";

import { Gallery, Header, Text, Link } from "@ui.packages/kit";

import React from 'react';
import types from "prop-types";
import { useDispatch } from 'react-redux';

import { closeCart } from '../../../ducks/cartSlice';

import cn from "classnames";
import styles from "./defaults.module.scss";


function Product({ uuid, gallery, brand, name, amount, currency, onRemove }) {
  const dispatch = useDispatch();
  const classNameRemoveProduct = cn(styles['remove'], 'far fa-trash-alt');
console.log(uuid)
  return (
    <div className={styles['item']}>
      <div className={styles['item__promo']}>
        <Gallery items={gallery} isList={false} size="small" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
      </div>
      <div className={styles['item__description']}>
        <div className={styles['item__names']}>
          <span className={styles['brand']}>
            <Header level={4}>
              <Link href={process.env['PUBLIC_URL'] + `/products/${uuid}`} onClick={() => dispatch(closeCart())}>
                { brand }
              </Link>
            </Header>
          </span>
          <div className={styles['name']}>
            <Text type={Text.TYPE_COMMENT}>{ name }</Text>
          </div>
        </div>
        <div className={styles['item__count']}>
          <p className={styles['item__amount']}>{numeral(amount).format()} {currency['value']}</p>
        </div>
      </div>
      <div className={styles['item__controls']}>
        <span className={classNameRemoveProduct} onClick={() => onRemove(uuid)} />
      </div>
    </div>
  );
}

Product.propTypes = {
  uuid: types.string,
  gallery: types.array,
  brand: types.string,
  name: types.string,
  amount: types.number,
  onRemove: types.func,
  closeCart: types.func,
  removeProduct: types.func,
};

Product.defaultProps = {
  uuid: null,
  gallery: [],
  brand: '',
  name: '',
  amount: 0.00,
};

export default Product;
