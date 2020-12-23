
import numeral from "@ui.packages/numeral";
import { Dialog, Confirm } from "@ui.packages/dialog";
import { Radio, RadioBoxField, Gallery } from "@ui.packages/kit";

import types from 'prop-types';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import React, { Fragment, Suspense, lazy } from 'react';

import cn from 'classnames';
import styles from "./default.module.scss";


const Lens = lazy(() => import(/* webpackChunkName: "order.lens" */'./Lens'));
const Recipe = lazy(() => import(/* webpackChunkName: "order.recipe" */'./Recipe'));

const PrescriptionFormModify = lazy(() => import(/* webpackChunkName: "order.prescription" */'./PrescriptionFormModify'));
const SelectLensesFormModify = lazy(() => import(/* webpackChunkName: "order.select-lenses" */'./SelectLensesFormModify'));


function ProductWithFurther({ uuid, index, name, brand, gallery, amount, currency, productType, recipe, errors, params, lens, openDialog, closeDialog, removeProduct, field, change }) {
  function getLensAmount() {
    let amount = 0;

    if (lens['index']) {
      amount += lens['index']['coast'];
    }
    if (lens['coating']) {
      amount += lens['coating']['coast'];
    }
    if (lens['design']) {
      amount += lens['design']['coast'];
    }
    if (lens['type']) {
      amount += lens['type']['coast'];
    }
    return amount;
  }

  function handlePrescriptionModifyOpenDialog() {
    openDialog(`${field}.prescription-modify`);
  }

  function handleSelectLensesOpenDialog() {
    openDialog(`${field}.select-lenses`);
  }

  function handlePrescriptionSubmit(data) {
    change('order', `${field}.recipe`, data);
    closeDialog(`${field}.prescription-modify`);
  }

  function handleLensesSubmit(data) {
    change('order', `${field}.lens`, data);
    closeDialog(`${field}.select-lenses`);
  }

  function handleCloseConfirmDialog() {
    closeDialog('remove-confirm-' + uuid);
  }

  function handleRemoveFromCart() {
    openDialog('remove-confirm-' + uuid);
  }

  function handleConfirmRemoveFromCart() {
    removeProduct(uuid);
    handleCloseConfirmDialog();
  }

  const hasRecipe = recipe && !! Object.keys(recipe).length;
  const hasLens = lens && !! Object.keys(lens).length;
  const hasItemsErrors = !! errors['items'] && errors['items'][index];

  const removeFromCartClassName= cn(styles['remove'], 'far fa-trash-alt');

  return(
      <div className={styles['product']}>
        <div className={styles['gallery']}>
          <span className={styles['product__uuid']}>{ uuid }</span>
          <div className={styles['gallery__images']}>
            <Gallery items={gallery} valueKey="externalId" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
          </div>
          <div className={styles['amount']}>
            <div className={styles['amount__main']}>
              <span className={styles['amount__value']}>{numeral(amount).format()}</span>
              <span className={styles['amount__currency']}>{currency['value']}</span>
            </div>
            {hasLens && productType === 'on-prescription' && (
              <div className={styles['amount__add']}>
                <span className={styles['amount__value']}>+ {numeral(getLensAmount()).format()}</span>
                <span className={styles['amount__currency']}>{currency['value']}</span>
              </div>)}
          </div>
        </div>
        <div className={styles['content']}>
          <span className={removeFromCartClassName} onClick={() => handleRemoveFromCart()} />
          <h3 className={styles['product__brand']}>
            <Link className={styles['product__brand-link']} to={process.env['PUBLIC_URL'] + `/products/${uuid}`}>{brand}</Link>
            {name && <span className={styles['product__name']}>({name})</span>}
          </h3>
          {(params === 'further') && (
            <div className={styles['details']}>
              <RadioBoxField name={`${field}.productType`}>
                <Radio className={styles['type']} name="on-prescription" label="Очки по рецепту" />
                <Radio className={styles['type']} name="image-lenses" label="С имиджевыми линзами" />
                <Radio className={styles['type']} name="only-rim" label="Только оправа" />
              </RadioBoxField>
              <div className={styles['details__content']}>
                {productType === 'only-rim' && <p className={styles['details__info']}>Преобретается только оправа.</p>}
                {productType === 'image-lenses' && <p className={styles['details__info']}>Преобретается оправа с линзами без диоптрий, но с основными защитами.</p>}
                {productType === 'on-prescription' && (
                  <Fragment>
                    <p className={styles['details__info']}>Преобретается оправа с линзами по рецепту.</p>
                    <p className={styles['details__info']}>
                      1. <span className={styles['link']} onClick={() => handlePrescriptionModifyOpenDialog()}>{hasRecipe ? 'Изменить' : 'Заполинть'}</span> рецепт.
                      {hasRecipe && <i className={cn(styles['success'], 'fas fa-check-circle')} />}
                      { ! hasRecipe && <i className={cn(styles['danger'], 'fas fa-exclamation-circle')} />}
                      {hasItemsErrors && errors['items'][index]['recipe'] && <span className={styles['error']}>[{errors['items'][index]['recipe']}]</span>}
                    </p>
                    <Suspense fallback={null}>
                      {hasRecipe && <Recipe {...recipe} />}
                    </Suspense>
                    <p className={styles['details__info']}>
                      2. <span className={styles['link']} onClick={() => handleSelectLensesOpenDialog()}>{hasLens ? 'Заменить' : 'Выбрать'}</span> линзы.
                      {hasLens && <i className={cn(styles['success'], 'fas fa-check-circle')} />}
                      { ! hasLens && <i className={cn(styles['danger'], 'fas fa-exclamation-circle')} />}
                      {hasItemsErrors && errors['items'][index]['lens'] && <span className={styles['error']}>[{errors['items'][index]['lens']}]</span>}
                    </p>
                    <Suspense fallback={null}>
                      {hasLens && <Lens {...lens} />}
                    </Suspense>
                  </Fragment>
                )}
              </div>
            </div>
          )}
        </div>
        <Suspense fallback={null}>
          <Field name={`${field}.recipe`} component={() => <Dialog title="Рецепт на изготовление очков" name={`${field}.prescription-modify`}>
            <PrescriptionFormModify value={recipe || {}} onSubmit={(data) => handlePrescriptionSubmit(data)} />
          </Dialog>} />
          <Field name={`${field}.lens`} component={() => <Dialog title="Выбор линз" name={`${field}.select-lenses`}>
            <SelectLensesFormModify value={lens || {}} onSubmit={(data) => handleLensesSubmit(data)} />
          </Dialog>} />
        </Suspense>
        <Confirm
          name={'remove-confirm-' + uuid}
          message="Вы уверены что хотите удалить продукт из карзины?"
          onCancel={() => handleCloseConfirmDialog()}
          onConfirm={() => handleConfirmRemoveFromCart()}
        />
      </div>
  );
}

ProductWithFurther.propTypes = {
  uuid: types.string,
  name: types.string,
  brand: types.string,
  gallery: types.array,
  amount: types.number,
  currency: types.object,
  productType: types.string,
  recipe: types.object,
  lens: types.object,
  params: types.string,
};

ProductWithFurther.defaultProps = {
  uuid: '',
  name: '',
  brand: '',
  gallery: [],
  amount: 0,
  currency: {},
  productType: 'on-prescription',
  recipe: null,
  lens: null,
  params: '',
};

export default ProductWithFurther;
