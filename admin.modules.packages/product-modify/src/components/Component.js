
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Row, Col, Button, Container } from '@ui.packages/ui';

import ModifyForm from './ModifyForm';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    hasId: types.bool,
    isInvalid: types.bool,
    isPristine: types.bool,
    product: types.object,
    units: types.array,
    currencies: types.array,
    isError: types.bool,
    createProduct: types.func,
    updateProductsById: types.func,
    onSubmit: types.func,
  };

  static defaultProps = {
    product: {},
    units: [],
    currencies: [],
    isError: false,
  };

  _handleSubmitProduct(formData) {
    const { updateProductsById, createProduct } = this.props;
    if (formData['id']) {
      updateProductsById(formData);
    } else {
      createProduct(formData);
    }
  }

  _handleSubmit() {
    const { onSubmit } = this.props;
    onSubmit('modify-product');
  }

  _handleReset() {
    const { reset } = this.props;
    reset('modify-product');
  }

  render() {
    const { isError, hasId, isInvalid, isPristine, product, currencies, units, categories } = this.props;
    return (isError
      ? (
        <p>Error</p>
      )
      : (
        <Container className={styles['form']}>
          <Row>
            <Col>
              <ModifyForm initialValues={product} units={units} currencies={currencies} categories={categories} onSubmit={this._handleSubmitProduct.bind(this)} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                disabled={isPristine}
                onClick={this._handleReset.bind(this)}
              >Отмена</Button>
              <Button
                type="submit"
                disabled={isInvalid || isPristine}
                mode="success"
                onClick={this._handleSubmit.bind(this)}
              >{hasId ? 'Сохранить' : 'Добавить'}</Button>
            </Col>
          </Row>
        </Container>
      ));
  }
}

export default Component;
