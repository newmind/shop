
import {
  selectBrands,
  selectCategories,
  selectCurrencies,
  selectInProcess,
  selectTypes,

  createType,
  createBrand,
  createCategory,
} from "@modules/admin-product-modify";

import { Dialog, openDialog, closeDialog } from '@ui.packages/dialog';
import { CheckBoxField, Col, Header, InputField, Row, SelectField, TextareaField } from "@ui.packages/kit";

import React from 'react';
import { change } from 'redux-form';
import { useSelector, useDispatch } from "react-redux";

import TypeFormModify from './TypeFormModify';
import CategoryFormModify from './CategoryFormModify';
import BrandFormModify from './BrandFormModify';

import styles from './default.module.scss';


function Common() {
  const dispatch = useDispatch();

  const types = useSelector(selectTypes);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const currencies = useSelector(selectCurrencies);
  const inProcess = useSelector(selectInProcess);

  function handleAddType() {
    dispatch(openDialog('new-type'));
  }

  function handleAddCategory() {
    dispatch(openDialog('new-category'));
  }

  function handleAddBrand() {
    dispatch(openDialog('new-brand'));
  }

  async function handleCreateType(data) {
    const typeId = await dispatch(createType(data))
    dispatch(change('product-modify', 'type', typeId));
    dispatch(closeDialog('new-type'));
  }

  async function handleCreateCategory(data) {
    const categoryId = await dispatch(createCategory(data))
    dispatch(change('product-modify', 'category', categoryId));
    dispatch(closeDialog('new-category'));
  }

  async function handleCreateBrand(data) {
    const brandId = await dispatch(createBrand(data))
    dispatch(change('product-modify', 'brand', brandId));
    dispatch(closeDialog('new-brand'));
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={3}>Основные</Header>
      </div>
      <div className={styles['content']}>
        <Row>
          <Col>
            <CheckBoxField name="isView" label="отображать в каталоге" />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField name="uuid" label="Номер товара (генерируется автоматически)" disabled />
          </Col>
          <Col>
            <InputField name="fiscal" label="Фискальный номер" disabled={inProcess} />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className={styles['block']}>
              <div className={styles['value']}>
                <SelectField
                  require
                  simple
                  name="type"
                  label="Тип"
                  options={types}
                  optionKey="id"
                  optionValue="value"
                  disabled={inProcess}
                />
              </div>
              <div className={styles['controls']}>
                <span className={styles['link']} onClick={() => handleAddType()}><i className="fas fa-plus-circle" /></span>
              </div>
            </div>
          </Col>
          <Col>
            <div className={styles['block']}>
              <div className={styles['value']}>
                <SelectField
                  require
                  simple
                  name="category"
                  label="Категория"
                  options={categories}
                  optionKey="id"
                  optionValue="value"
                  disabled={inProcess}
                />
              </div>
              <div className={styles['controls']}>
                <span className={styles['link']} onClick={() => handleAddCategory()}><i className="fas fa-plus-circle" /></span>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className={styles['block']}>
              <div className={styles['value']}>
                <SelectField
                  require
                  simple
                  name="brand"
                  label="Бренд"
                  options={brands}
                  optionKey="id"
                  optionValue="value"
                  disabled={inProcess}
                />
              </div>
              <div className={styles['controls']}>
                <span className={styles['link']} onClick={() => handleAddBrand()}><i className="fas fa-plus-circle" /></span>
              </div>
            </div>
          </Col>
          <Col>
            <InputField require name="name" label="Назвние" disabled={inProcess} />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField require name="price" label="Цена" disabled={inProcess} />
          </Col>
          <Col>
            <SelectField
              require
              simple
              name="currencyCode"
              label="Валюта"
              options={currencies}
              optionKey="code"
              optionValue="value"
              disabled={inProcess}
            />
          </Col>
          <Col />
          <Col />
        </Row>
        <Row>
          <Col>
            <TextareaField
              require
              name="description"
              label="Описание"
              disabled={inProcess}
            />
          </Col>
        </Row>
      </div>

      <Dialog name={'new-type'} title={'Тип продукта'}>
        <TypeFormModify onSubmit={(data) => handleCreateType(data)} />
      </Dialog>

      <Dialog name={'new-category'} title={'Категория продукта'}>
        <CategoryFormModify onSubmit={(data) => handleCreateCategory(data)} />
      </Dialog>

      <Dialog name={'new-brand'} title={'Бренд продукта'}>
        <BrandFormModify onSubmit={(data) => handleCreateBrand(data)} />
      </Dialog>

    </div>
  );
}

export default Common;
