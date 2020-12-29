
import { Image } from '@ui.packages/kit';

import React from 'react';
import types from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './default.module.scss';


export default function Categories({ id, imageId, value }) {
  return (
    <Link className={styles['wrapper']} to={process.env['PUBLIC_URL'] + '/products?categoryId=' + id}>
      <div className={styles['promo']}>
        <Image src={process.env['REACT_APP_API_HOST'] + '/gallery/' + imageId} />
      </div>
      <div className={styles['information']}>
        <div className={styles['caption']}>
          <span className={styles['caption__text']}>{ value }</span>
        </div>
      </div>
    </Link>
  );
}

Categories.propTypes = {
  items: types.array,
};

Categories.defaultProps = {
  items: [],
};
