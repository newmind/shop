
import numeral from '@packages/numeral';

import { Gallery, Header, Text, Link } from '@ui.packages/kit';

import React from 'react';
import types from 'prop-types';

import styles from './default.module.scss';


export default function Product({ uuid, price, currency, brands, name, count, gallery }) {
  return (
    <Link className={styles['wrapper']} href={`/products/${uuid}`}>
      <div className={styles['gallery']}>
        <Gallery items={gallery} isList={false} size="middle" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
      </div>
      <div className={styles['common']}>
        <div className={styles['description']}>
          <div className={styles['name']}>
            <Header level={3}>{ name }</Header>
          </div>
          <div className={styles['brand']}>
            <Text type={Text.TYPE_COMMENT}>{ brands.map((brand) => brand) }</Text>
          </div>
          <div className={styles['uuid']}>
            <Text type="uuid">{ uuid }</Text>
          </div>
        </div>
        <div className={styles['amount']}>
          <Text type={Text.TYPE_AMOUNT}>{ count } x { numeral(price).format() } { currency }</Text>
        </div>
        <div className={styles['full-price']}>
          <Text type={Text.TYPE_COMMENT}>= { numeral(price * count).format() } { currency}</Text>
        </div>
      </div>
    </Link>
  );
}

Product.propTypes = {
  uuid: types.string,
  cart: types.array,
  gallery: types.array,
  price: types.number,
  brand: types.string,
  name: types.string,
};

Product.defaultProps = {
  uuid: null,
  cart: [],
  gallery: [],
  price: 0.00,
  brand: 'None',
  name: 'None',
};
