
import numeral from "@packages/numeral";

import { Gallery, Header, Text, Link } from "@ui.packages/kit";

import React from 'react';
import types from "prop-types";
import { useDispatch, useSelector } from 'react-redux';

import { closeCartAction } from '../../../ducks/slice';

import cn from "classnames";
import styles from "./defaults.module.scss";

import { selectUuid } from '../../../ducks/slice';


function Product({ uuid, gallery, brand, name, price, currency, onRemove }) {
  const dispatch = useDispatch();
  const uuids = useSelector(selectUuid);
  const classNameRemoveProduct = cn(styles['remove'], 'far fa-trash-alt');

  const product = uuids.find(item => item[0] === uuid);

  if ( ! product) {
    return null;
  }

  return (
    <div className={styles['item']}>
      <div className={styles['item__promo']}>
        <Gallery items={gallery} isList={false} size="small" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
      </div>
      <div className={styles['item__description']}>
        <div className={styles['item__names']}>
          <span className={styles['brand']}>
            <Header level={4}>
              <Link href={process.env['PUBLIC_URL'] + `/products/${uuid}`} onClick={() => dispatch(closeCartAction())}>
                { brand }
              </Link>
            </Header>
          </span>
          <div className={styles['name']}>
            <Text type={Text.TYPE_COMMENT}>{ name }</Text>
          </div>
        </div>
        <div className={styles['item__count']}>
          <p className={styles['item__amount']}>{ product[1] } x { numeral(price).format() } { currency }</p>
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
  price: types.number,
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
