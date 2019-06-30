
import types from 'prop-types';
import React, { PureComponent } from 'react';

import {Row, Col, Button} from '@packages/ui';
import ModifyForm from './ModifyForm';


class Component extends PureComponent {
  static propTypes = {
    hasId: types.bool,
    isInvalid: types.bool,
    isPristine: types.bool,
    product: types.object,
    units: types.array,
    isError: types.bool,
    createProduct: types.func,
    updateProductsById: types.func,
    onSubmit: types.func,
  };

  static defaultProps = {
    product: {},
    units: [],
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

  render() {
    const { isError, hasId, isInvalid, isPristine, product, units } = this.props;
    return (isError
      ? (
        <p>Error</p>
      )
      : (
        <div className="page">
          <Row>
            <Col>
              <ModifyForm initialValues={product} units={units} onSubmit={this._handleSubmitProduct.bind(this)} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                type="submit"
                disabled={isInvalid || isPristine}
                mode="success"
                onClick={this._handleSubmit.bind(this)}
              >{hasId ? 'Сохранить' : 'Добавить'}</Button>
            </Col>
          </Row>
        </div>
      ));
  }
}

export default Component;
