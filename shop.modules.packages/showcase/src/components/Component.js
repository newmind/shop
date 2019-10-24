
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { reduceToArray, objectToQuery, nounDeclension } from '@ui.packages/utils';

import Product from './Product';
import Filter from './Filter';

import styles from './default.module.scss';

const SIZE = 3;


class Component extends PureComponent {
  static propTypes = {
    items: types.array,
    count: types.number,
    paging: types.shape({
      page: types.number,
      pages: types.number,
    }),
    addProductToCart: types.func,
  };

  static defaultProps = {
    items: [],
    paging: {
      page: 1,
      pages: 1,
    },
    count: 0,
  };

  _handleLoadingMore() {
    const { getProducts, paging: { page } } = this.props;
    const newPage = page + 1;
    getProducts(newPage);
  }

  // _handleFastView() {
  //   const { openDialog } = this.props;
  //   openDialog('product');
  // }

  _handleCart(product) {
    const { addProductToCart } = this.props;
    addProductToCart(product);
  }

  _handleFilter(formData) {
    const { getProducts, pushSearch } = this.props;
    pushSearch({
      path: '/product',
      search: objectToQuery(formData),
    });
    getProducts(formData);
  }

  render() {
    const { items, meta, initialValues, inProcess } = this.props;
    const products = reduceToArray(items, SIZE);

    return (
      <section className={styles['wrapper']}>
        <aside className={styles['filters']}>
          <Filter inProcess={inProcess} initialValues={initialValues} onSubmit={this._handleFilter.bind(this)} />
        </aside>
        <section className={styles['products']}>
          <div className={styles['main']}>
            <h2 className={styles['main__header']}>Найдено {meta['total']} {nounDeclension(meta['total'], ['предложение', 'предложения', 'предложений'])}</h2>
            {products.map((lineWithProducts, index) => {
              return (
                <div key={index} className={styles['products__line']}>
                  {lineWithProducts.map((product, index) => (
                    <Product
                      key={index}
                      {...product}
                      onCart={this._handleCart.bind(this, product)} />
                  ))}
                </div>
              );
            })}
            {(items.length < meta['total']) && (
              <div className={styles['products__controls']}>
                <button className={styles['products__more']} type="button" onClick={this._handleLoadingMore.bind(this)}>Показать еще 12 из {meta['total']}</button>
              </div>
            )}
          </div>

        </section>
      </section>
    );
  }
}

export default Component;
