
import React, { Fragment, PureComponent } from 'react';
import { Field } from 'redux-form';

import numeral from "@ui.packages/numeral";
import { Dialog } from "@ui.packages/dialog";
import { Radio, RadioBoxField, Gallery } from "@ui.packages/ui";

import PrescriptionFormModify from './PrescriptionFormModify';
import SelectLensesFormModify from './SelectLensesFormModify';

import Recipe from './Recipe';

import styles from "./default.module.scss";


class Component extends PureComponent {
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

  render() {
    const { field, index, product, amount, currency, type, recipe, lens, errors } = this.props;
    const { name, brand, gallery } = product;

    const hasRecipe = !! Object.keys(recipe).length;
    const hasLens = !! Object.keys(lens).length;
    const hasItemsErrors = !! errors['items'] && errors['items'][index];

    return(
      <div className={styles['product']}>
        <div className={styles['gallery']}>
          <div className={styles['gallery__images']}>
            <Gallery items={gallery} valueKey="id" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
          </div>
          <div className={styles['amount']}>
            <div className={styles['amount__main']}>
              <span className={styles['amount__value']}>{numeral(amount).format()}</span>
              <span className={styles['amount__currency']}>{currency['value']}</span>
            </div>
          </div>
        </div>
        <div className={styles['content']}>
          <h3 className={styles['product__brand']}>{brand}</h3>
          <p className={styles['product__name']}>{name}</p>
          <div className={styles['details']}>
            <RadioBoxField name={`${field}.type`}>
              <Radio className={styles['type']} name="only-rim" label="Только оправа" />
              <Radio className={styles['type']} name="image-lenses" label="С имиджевыми линзами" />
              <Radio className={styles['type']} name="on-prescription" label="Очки по рецепту" />
            </RadioBoxField>
            <div className={styles['details__content']}>
              {type === 'only-rim' && <p className={styles['details__info']}>Преобретается только оправа с предустановленными заводскими модификациями.</p>}
              {type === 'image-lenses' && <p className={styles['details__info']}>Преобретается оправа с линзами без диоптрий, но с основными защитами.</p>}
              {type === 'on-prescription' && (
                <Fragment>
                  <p className={styles['details__info']}>Преобретается оправа с линзами и установкой линз по медицинскому рецепту.</p>
                  <p className={styles['details__info']}>
                    1. <span className={styles['link']} onClick={this._handlePrescriptionModifyOpenDialog.bind(this)}>{hasRecipe ? 'Изменить' : 'Заполинть'}</span> рецепт.
                    {hasItemsErrors && errors['items'][index]['recipe'] && <span className={styles['error']}>[{errors['items'][index]['recipe']}]</span>}
                  </p>
                  {hasRecipe && <Recipe {...recipe} />}
                  <p className={styles['details__info']}>
                    2. <span className={styles['link']} onClick={this._handleSelectLensesOpenDialog.bind(this)}>{hasLens ? 'Заменить' : 'Выбрать'}</span> линзы.
                    {hasItemsErrors && errors['items'][index]['lens'] && <span className={styles['error']}>[{errors['items'][index]['lens']}]</span>}
                  </p>
                  {hasLens && <p>Pfgjkytyj</p>}
                </Fragment>
              )}
            </div>
          </div>
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
