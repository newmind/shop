
import { Mode } from '@ui.packages/types';
import { Button, Header, Page, PageContent, PageControls } from '@ui.packages/kit';

import React from 'react';
import types from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { submit, reset, isPristine, isValid } from 'redux-form';

import ModifyForm from './ModifyForm';

import styles from './default.module.scss';

import { selectProduct } from '../ducks/slice';
import { updateProductsById, createProduct, deleteImages } from '../ducks/commands';


const FORM_NAME = 'modify-product';


function ProductModify() {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const valid = useSelector(isValid(FORM_NAME));
  const pristine = useSelector(isPristine(FORM_NAME));

  function handleSubmitProduct(formData) {
    if (formData['uuid']) {
      dispatch(updateProductsById(formData));
    } else {
      dispatch(createProduct(formData));
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
    <Page className={styles['wrapper']}>
      <PageControls>
        <div className={styles['controls']}>
          <Button
            form={Button.FORM_CONTEXT}
            mode={Mode.PRIMARY}
            disabled={pristine}
            onClick={handleReset}
          >Отмена</Button>
          <Button
            type={Button.TYPE_BUTTON}
            disabled={ ! valid || pristine}
            mode="success"
            onClick={handleSubmit}
          >{product['uuid'] ? 'Сохранить' : 'Добавить'}</Button>
        </div>
      </PageControls>
      <PageContent>
        <header className={styles['header']}>
          <Header level={1}>{product['uuid'] ? 'Редактировать товар' : 'Новый товар'}</Header>
        </header>
        <article className={styles['content']}>
          <ModifyForm
            initialValues={product}
            onDelete={handleDeleteImages}
            onSubmit={handleSubmitProduct}
          />
        </article>
      </PageContent>
    </Page>
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
