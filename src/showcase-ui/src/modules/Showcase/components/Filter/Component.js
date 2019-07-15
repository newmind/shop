
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { SelectField, InputField, Row, Col, Button } from '@ui.packages/ui';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    categories: types.array,
    brands: types.array,
  };

  static defaultProps = {
    categories: [],
    brands: [],
  };

  _handleResetForm() {
    const { reset } = this.props;
    reset('filter-showcase-ui');
  }

  render() {
    const { handleSubmit, categories, brands, isValid } = this.props;
    return (
      <form onSubmit={handleSubmit} className={styles['wrapper']}>
        <div className={styles['fields']}>
          <Row>
            <Col>
              <SelectField
                label="Категория"
                name="categoryId"
                options={categories}
                optionValue="name"
                simple={true}
              />
            </Col>
            <Col>
              <SelectField
                label="Бренд"
                name="brand"
                optionKey="brand"
                optionValue="brand"
                options={brands}
                simple={true}
                optionTransform={option => `${option['brand']} (${option['count']})`}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={styles['amount']}>
                <span className={styles['amount__label']}>Сумма</span>
                <span className={styles['amount__wrapper']}>
                  <InputField className={styles['amount__input']} name="amountFrom" />
                  <span className={styles['amount__delimiter']}>-</span>
                  <InputField className={styles['amount__input']} name="amountTo" />
                </span>
              </div>
            </Col>
            <Col>
              <div className={styles['controls']}>
                <Button type="submit" mode="primary" disabled={ ! isValid}>Применить</Button>
                <Button type="button" onClick={this._handleResetForm.bind(this)}>Сбросить</Button>
              </div>
            </Col>
          </Row>
        </div>
      </form>
    );
  }
}

export default Component;
