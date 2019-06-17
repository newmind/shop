
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Row, Col, InputField, SelectField } from '@packages/ui';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    products: types.array,
    options: types.array,
    categories: types.array,
    disabled: types.bool,
  };

  static defaultProps = {
    products: [],
    options: [],
    categories: [],
    disabled: false,
  };

  render() {
    const { products, currencies, categories, disabled, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} className={styles['form']}>
        <Row>
          <Col>
            <SelectField
              label="Категория продукта"
              name="category"
              options={categories}
              optionValue={'name'}
              disabled={disabled}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField
              label="Количество"
              name="count"
              disabled={disabled}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField name="amount" label="Цена" />
          </Col>
          <Col>
            <SelectField name="currency" label="Валюта" options={currencies} />
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectField
              label="Продукт"
              name="product"
              options={products}
              optionValue={'name'}
              disabled={disabled}
            />
          </Col>
        </Row>
      </form>
    );
  }
}

export default Component;
