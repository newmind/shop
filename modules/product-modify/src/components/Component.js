
import { Row, Col, Button, Container } from '@ui.packages/kit';

import React from 'react';
import types from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { submit, reset, isPristine, isValid } from 'redux-form';

import ModifyForm from './ModifyForm';

import styles from './default.module.scss';

import { selectProduct } from '../ducks/slice';
import { updateProductsById, createProduct, deleteImages } from '../ducks/commands';


const FORM_NAME = 'modify-product';


function ProductModify() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectProduct);
  const valid = useSelector(isValid(FORM_NAME));
  const pristine = useSelector(isPristine(FORM_NAME));

  function handleSubmitProduct(formData) {
    if (formData['uuid']) {
      dispatch(updateProductsById(formData));
    } else {
      dispatch(createProduct(formData));
      navigate('/');
    }
  }

  function handleDeleteImages(uuid) {
    dispatch(deleteImages([ uuid ]));
  }

  function handleSubmit() {
    dispatch(submit(FORM_NAME));
  }

  function handleReset() {
    dispatch(reset(FORM_NAME));
  }

  return (
    <Container className={styles['form']}>
      <Row>
        <Col>
          <ModifyForm
            initialValues={product}
            onDelete={handleDeleteImages}
            onSubmit={handleSubmitProduct}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            disabled={pristine}
            onClick={handleReset}
          >Отмена</Button>
          <Button
            type={Button.TYPE_BUTTON}
            disabled={ ! valid || pristine}
            mode="success"
            onClick={handleSubmit}
          >{product['uuid'] ? 'Сохранить' : 'Добавить'}</Button>
        </Col>
      </Row>
    </Container>
  );
}

ProductModify.propTypes = {
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

ProductModify.defaultProps = {
  product: {},
  types: [],
  colors: [],
  units: [],
  currencies: [],
  materials: [],
  isError: false,
};

export default ProductModify;