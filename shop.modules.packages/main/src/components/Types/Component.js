
import { Image } from '@ui.packages/kit';
import { reduceToArray } from '@ui.packages/utils';

import React from 'react';
import { Link } from 'react-router-dom';

import styles from './default.module.scss';


function Types({ items } ) {
  const types = reduceToArray(items, 4, { fillNull: true });

  return (
    <div className={styles['wrapper']}>
      <h2 className={styles['header']}>Какой тип товара Вас интересует?</h2>
      {types.map((line, index) => (
        <div key={index} className={styles['line']}>
          {line.map((type, index) => (
            <div key={index} className={styles['line__col']}>
              { !! type && (
                <Link className={styles['type']} to={ process.env['PUBLIC_URL'] + '/products?typeId=' + type['id'] }>
                  <div className={styles['promo']}>
                    <Image src={ process.env['REACT_APP_API_HOST'] + '/gallery/' + type['imageId'] } />
                  </div>
                  <div className={styles['information']}>
                    <div className={styles['caption']}>
                      <span className={styles['caption__text']}>{ type['value'] }</span>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Types;
