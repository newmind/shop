
import { objectToQuery } from "@ui.packages/utils";
import { Button } from '@ui.packages/ui';

import types from 'prop-types';
import React, { PureComponent } from 'react';

import Filter from './Filter';
import Table from './Table';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    search: types.object
  };

  static defaultProps = {
    search: {},
  };

  _setQuery(formData) {
    const { push } = this.props;
    push('?' + objectToQuery({ ...formData }))
  }

  _handleAddProduct() {
    const { replaceURI } = this.props;
    replaceURI('/products/create');
  }

  render() {
    const { search } = this.props;

    return (
      <section className={styles['wrapper']}>
        <aside className={styles['controls']}>
          <Button
            mode="success"
            onClick={this._handleAddProduct.bind(this)}
          >Добавить товар</Button>
        </aside>
        <article className={styles['content']}>
          <div className={styles['header']}>
            <h2>Управление витриной</h2>
          </div>
          <div className={styles['filter']}>
            <Filter initialValues={search} onSubmit={this._setQuery.bind(this)} />
          </div>
          <div className={styles['table']}>
            <Table />
          </div>
          <div className={styles['paging']}>

          </div>
        </article>
      </section>
    );
  }
}

export default Component;
