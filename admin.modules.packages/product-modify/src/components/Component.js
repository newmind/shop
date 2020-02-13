
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
    types: types.array,
    colors: types.array,
    product: types.object,
    units: types.array,
    currencies: types.array,
    materials: types.array,
    isError: types.bool,
    submit: types.func,
    createProduct: types.func,
    updateProductsById: types.func,
  };

  static defaultProps = {
    product: {},
    types: [],
    colors: [],
    units: [],
    currencies: [],
    materials: [],
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

  _handleDeleteImages(id) {
    const { deleteImages } = this.props;
    deleteImages([ id ]);
  }

  _handleSubmit() {
    const { submit } = this.props;
    submit('modify-product');
  }

  _handleReset() {
    const { reset } = this.props;
    reset('modify-product');
  }

  render() {
    const { isError, hasId, isInvalid, isPristine, product, currencies, units, colors, materials, types, forms, categories } = this.props;

    return (isError
      ? (
        <p>Error</p>
      )
      : (
        <Container className={styles['form']}>
          <Row>
            <Col>
              <ModifyForm
                types={types}
                forms={forms}
                units={units}
                colors={colors}
                materials={materials}
                currencies={currencies}
                categories={categories}
                initialValues={product}
                onDelete={this._handleDeleteImages.bind(this)}
                onSubmit={this._handleSubmitProduct.bind(this)}
              />
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
