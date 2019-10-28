
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { objectToQuery } from '@ui.packages/utils';

import Filter from './Filter';
import Products from './Products';
import Paging from './Paging';

import styles from './default.module.scss';




class Component extends PureComponent {
  static propTypes = {
    items: types.array,
    paging: types.shape({
      page: types.number,
    }),
    addProductToCart: types.func,
  };

  static defaultProps = {
    items: [],
    paging: {
      page: 1,
    },
    count: 0,
  };

  _handleFilter(formData) {
    const { getProducts, pushSearch } = this.props;
    pushSearch({
      path: '/product',
      search: objectToQuery(formData),
    });
    getProducts(formData);
  }

  _handleCart(product) {
    const { addProductToCart } = this.props;
    addProductToCart(product);
  }

  _handleLoadingMore() {
    const { getProducts, paging: { page }} = this.props;
    const newPage = page + 1;
    getProducts({ page: newPage });
  }

  render() {
    return (
      <section className={styles['wrapper']}>
        <aside className={styles['filters']}>
          <Filter
            onSubmit={this._handleFilter.bind(this)}
          />
        </aside>
        <section className={styles['products']}>
          <Products
            onAddToCart={this._handleCart.bind(this)}
          />
        </section>
        <div className={styles['controls']}>
          <Paging
            onGetMore={this._handleLoadingMore.bind(this)}
          />
        </div>
      </section>
    );
  }
}

export default Component;
