
import { Gallery, Text } from "@ui.packages/kit";

import React from 'react';
import types from 'prop-types';

import Properties from './Properties';
import Information from './Information';

import styles from './default.module.scss';


function FastView({ product: { gallery, attributes, description }, product }) {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['product']}>
        <div className={styles['gallery']}>
          <Gallery items={gallery} size="middle" path={ `${process.env['REACT_APP_API_HOST']}/gallery` } />
        </div>
        <div className={styles['information']}>
          <Information product={product} />
        </div>
      </div>
      { !! description && (
        <div className={styles['description']}>
          <Text>{ description }</Text>
        </div>
      )}
      { !! attributes.length && (
        <div className={styles['property']}>
          <Properties list={attributes} />
        </div>
      )}
    </div>

  );
}

FastView.propTypes = {
  cart: types.array,
};

FastView.defaultProps = {
  cart: [],
};

export default FastView;