
import {Gallery, Breadcrumbs, Text} from '@ui.packages/kit';

import React from 'react';
import { useSelector } from 'react-redux';

import Information from './Information';
import Comments from './Comments';
import Attributes from './Attributes';

import styles from './default.module.scss';

import { selectProduct } from '../ducks/slice';


function Product() {
  const product = useSelector(selectProduct);

  if ( ! product) {
    return null;
  }

  return (
    <article className={styles['wrapper']}>
      <div className={styles['breadcrumbs']}>
        <div className={styles['breadcrumbs__content']}>
          <Breadcrumbs
            items={[
              { title: 'Витрина', href: '/products' },
              { title: product['brand'] },
            ]}
          />
        </div>
      </div>
      <div className={styles['content']}>
        <div className={styles['common']}>
          <div className={styles['gallery']}>
            <Gallery items={product['gallery']} valueKey="externalId" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
          </div>
          <div className={styles['information']}>
            <Information {...product} />
          </div>
        </div>
        { !! product['description'] && (
          <div className={styles['description']}>
            <Text>{ product['description'] || '' }</Text>
          </div>
        )}
        { !! product['attributes'].length && (
          <div className={styles['attributes']}>
            <Attributes list={product['attributes']} />
          </div>
        )}
        <div className={styles['comments']}>
          <Comments comments={product['comments']} />
        </div>
      </div>
    </article>
  );
}

Product.propTypes = {};

Product.defaultProps = {};

export default Product;
