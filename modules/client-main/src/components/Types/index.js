
import { Header, Link } from '@ui.packages/kit';

import React from 'react';

import Product from "./Product";

import styles from './default.module.scss';


function Types({ id, value, products }) {
    return (
    <div className={styles['wrapper']}>
      <div className={styles['label']}>
        <div className={styles['value']}>
          <Header theme={'light'} level={3}>{ value }</Header>
        </div>
        <div className={styles['link']}>
          <Link href={process.env['PUBLIC_URL'] + 'products?typeId=' + id}>Подробнее</Link>
        </div>
      </div>
      <div className={styles['content']}>
        {products.map((product) => (
          <div key={product['uuid']} className={styles['item']}>
            <Product {...product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Types;
