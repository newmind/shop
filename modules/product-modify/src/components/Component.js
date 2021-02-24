
import { Mode } from '@ui.packages/types';
import { Dialog } from '@ui.packages/dialog';
import { Button, Header, Page, PageContent, PageControls } from '@ui.packages/kit';

import React from 'react';
import types from 'prop-types';
import { change } from 'redux-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { submit, reset, isPristine, isValid } from 'redux-form';

import ModifyForm from './ModifyForm';
import ImagesForm from "./ImagesForm";

import styles from './default.module.scss';

import { selectProduct, selectInProcess } from '../ducks/slice';
import { updateProductsById, createProduct, deleteImages } from '../ducks/commands';


const FORM_NAME = 'modify-product';


function ProductModify() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectProduct);
  const inProcess = useSelector(selectInProcess);
  const valid = useSelector(isValid(FORM_NAME));
  const pristine = useSelector(isPristine(FORM_NAME));

  async function handleSubmitProduct(formData) {
    if (formData['uuid']) {
      await dispatch(updateProductsById(formData));
    } else {
      const uuid = await dispatch(createProduct(formData));
      if (uuid) {
        navigate(process.env['PUBLIC_URL'] + '/products/' + uuid);
      }
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
    <Page className={styles['wrapper']} inProcess={inProcess}>
      <PageControls>
        <div className={styles['controls']}>
          <Button
            form={Button.FORM_CONTEXT}
            mode={Mode.PRIMARY}
            disabled={pristine || inProcess}
            onClick={handleReset}
          >Отмена</Button>
          <Button
            type={Button.TYPE_BUTTON}
            disabled={ ! valid || pristine || inProcess}
            mode="success"
            onClick={handleSubmit}
          >Сохранить</Button>
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

      <Dialog name="add-images" title="Добавить изображения">
        <ImagesForm
          initialValues={{
            gallery: product['gallery'] || [],
          }}
          onSubmit={(data) => dispatch(change('modify-product', 'gallery', data['gallery']))}
        />
      </Dialog>
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
