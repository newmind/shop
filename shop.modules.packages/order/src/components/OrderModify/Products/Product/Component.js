
import numeral from "@ui.packages/numeral";
import { Dialog } from "@ui.packages/dialog";
import { Radio, RadioBoxField, Gallery } from "@ui.packages/kit";

import types from 'prop-types';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import React, { Fragment, PureComponent } from 'react';

import PrescriptionFormModify from './PrescriptionFormModify';
import SelectLensesFormModify from './SelectLensesFormModify';

import Recipe from './Recipe';
import Lens from './Lens';

import cn from 'classnames';
import styles from "./default.module.scss";


class Component extends PureComponent {
  static propTypes = {
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

  static defaultProps = {
    uuid: '',
    name: '',
    brand: '',
    gallery: [],
    amount: 0,
    currency: {},
    productType: '',
    recipe: {},
    lens: {},
    params: '',
  };

  _getLensAmount() {
    let amount = 0;
    const { lens } = this.props;
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

  _handleSelectTypeOpenDialog() {
    const { openDialog } = this.props;
    openDialog('select-type');
  }

  _handlePrescriptionModifyOpenDialog() {
    const { field, openDialog } = this.props;
    openDialog(`${field}.prescription-modify`);
  }

  _handleSelectLensesOpenDialog() {
    const { field, openDialog } = this.props;
    openDialog(`${field}.select-lenses`);
  }

  _handlePrescriptionSubmit(data) {
    const { field, change, closeDialog } = this.props;
    change('order', `${field}.recipe`, data);
    closeDialog(`${field}.prescription-modify`);
  }

  _handleLensesSubmit(data) {
    const { field, change, closeDialog } = this.props;
    change('order', `${field}.lens`, data);
    closeDialog(`${field}.select-lenses`);
  }

  _handleRemoveFromCart() {
    const { uuid, removeProduct } = this.props;
    removeProduct(uuid);
  }

  render() {
    const { uuid, field, index, name, brand, gallery, amount, currency, productType, recipe, lens, errors, params } = this.props;

    const hasRecipe = !! Object.keys(recipe).length;
    const hasLens = !! Object.keys(lens).length;
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
                <span className={styles['amount__value']}>+ {numeral(this._getLensAmount()).format()}</span>
                <span className={styles['amount__currency']}>{currency['value']}</span>
              </div>)}
          </div>
        </div>
        <div className={styles['content']}>
          <span className={removeFromCartClassName} onClick={this._handleRemoveFromCart.bind(this)} />
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
                      1. <span className={styles['link']} onClick={this._handlePrescriptionModifyOpenDialog.bind(this)}>{hasRecipe ? 'Изменить' : 'Заполинть'}</span> рецепт.
                      {hasRecipe && <i className={cn(styles['success'], 'fas fa-check-circle')} />}
                      { ! hasRecipe && <i className={cn(styles['danger'], 'fas fa-exclamation-circle')} />}
                      {hasItemsErrors && errors['items'][index]['recipe'] && <span className={styles['error']}>[{errors['items'][index]['recipe']}]</span>}
                    </p>
                    {hasRecipe && <Recipe {...recipe} />}
                    <p className={styles['details__info']}>
                      2. <span className={styles['link']} onClick={this._handleSelectLensesOpenDialog.bind(this)}>{hasLens ? 'Заменить' : 'Выбрать'}</span> линзы.
                      {hasLens && <i className={cn(styles['success'], 'fas fa-check-circle')} />}
                      { ! hasLens && <i className={cn(styles['danger'], 'fas fa-exclamation-circle')} />}
                      {hasItemsErrors && errors['items'][index]['lens'] && <span className={styles['error']}>[{errors['items'][index]['lens']}]</span>}
                    </p>
                    {hasLens && <Lens {...lens} />}
                  </Fragment>
                )}
              </div>
            </div>
          )}
        </div>
        <Field name={`${field}.recipe`} component={() => <Dialog title="Рецепт на изготовление очков" name={`${field}.prescription-modify`}>
          <PrescriptionFormModify value={recipe} onSubmit={this._handlePrescriptionSubmit.bind(this)} />
        </Dialog>} />
        <Field name={`${field}.lens`} component={() => <Dialog title="Выбор линз" name={`${field}.select-lenses`}>
          <SelectLensesFormModify value={lens} onSubmit={this._handleLensesSubmit.bind(this)} />
        </Dialog>} />
      </div>
    );
  }
}

export default Component;
