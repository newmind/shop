
import { selectProduct } from '@modules/client-showcase';

import { Gallery } from '@ui.packages/kit';

import React from 'react';
import { useSelector } from 'react-redux';

import Information from "./Information";

import styles from './default.module.scss';


export default function Product() {
  const product = useSelector(selectProduct);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['gallery']}>
        <Gallery items={product['gallery']} path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
      </div>
      <div className={styles['information']}>
        <Information {...product} />
      </div>
    </div>
  );
}
