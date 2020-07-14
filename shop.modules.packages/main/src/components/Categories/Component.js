
import { Image } from '@ui.packages/kit';
import { reduceToArray } from '@ui.packages/utils';

import types from 'prop-types';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    items: types.array,
  };

  static defaultProps = {
    items: [],
  };

  render() {
    const { items } = this.props;

    const categories = reduceToArray(items, 3);

    return (
      <div className={styles['wrapper']}>
        <h2 className={styles['header']}>Выберите интересующую вас категорию</h2>
        {categories.map((line, index) => (
          <div key={index} className={styles['line']}>
            {line.map((category, index) => (
              <div key={index} className={styles['line__col']}>
                { !! category && (
                  <Link className={styles['category']} to={process.env['PUBLIC_URL'] + '/products?categoryId=' + category['id']}>
                    <div className={styles['promo']}>
                      <Image src={process.env['REACT_APP_API_HOST'] + '/gallery/' + category['imageId']} />
                    </div>
                    <div className={styles['information']}>
                      <div className={styles['caption']}>
                        <span className={styles['caption__text']}>{ category['value'] }</span>
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
}

export default Component;
