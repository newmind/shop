
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { objectToQuery } from '@ui.packages/utils';

import Filter from './Filter';
import Products from './Products';
import Paging from './Paging';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    addProductToCart: types.func,
  };

  static defaultProps = {};

  _handleFilter(formData) {
    const { pushSearch } = this.props;

    formData['page'] = 1;
    pushSearch({ search: objectToQuery(formData) });
  }

  _handleCart(product) {
    const { addProductToCart } = this.props;

    addProductToCart(product);
  }

  _handleLoadingMore(page) {
    const { location: { search }, pushSearch} = this.props;
    const query = new URLSearchParams(search);

    if (page > 1) {
      query.set('page', String(page));
    }
    else {
      query.delete('page');
    }

    pushSearch({ search: query.toString() });
  }

  render() {
    return (
      <section className={styles['wrapper']}>
        <aside className={styles['filters']}>
          <div className={styles['filters__content']}>
            <Filter
              onSubmit={this._handleFilter.bind(this)}
            />
          </div>
        </aside>
        <section className={styles['products']}>
          <Products
            onAddToCart={this._handleCart.bind(this)}
          />
        </section>
        <div className={styles['controls']}>
          <Paging
            onChange={this._handleLoadingMore.bind(this)}
          />
        </div>
      </section>
    );
  }
}

export default Component;
