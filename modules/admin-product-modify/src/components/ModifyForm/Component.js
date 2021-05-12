
import { Row, Col, CheckBoxField, InputField, TextareaField, SelectField, ListField, Header } from '@ui.packages/kit';

import React from 'react';
import { useSelector } from 'react-redux';
import { Field, FieldArray } from 'redux-form';

import Gallery from './Gallery';
import Attributes from './Attributes';

import styles from './default.module.scss';

import { selectBrands, selectTypes, selectCategories, selectCurrencies, selectInProcess, selectPromotions } from '../../ducks/slice';


function ModifyForm({ handleSubmit }) {
  const types = useSelector(selectTypes);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const currencies = useSelector(selectCurrencies);
  const promotions = useSelector(selectPromotions);
  const inProcess = useSelector(selectInProcess);

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>

      <div className={styles['block']}>
        <div className={styles['header']}>
          <Header level={3}>Изображения</Header>
        </div>
        <div className={styles['content']}>
          <Field name="gallery" component={Gallery} />
        </div>
      </div>

      <div className={styles['block']}>
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
              <ListField
                name="types"
                label="Тип"
                options={types}
                optionKey="id"
                optionValue="value"
                disabled={inProcess}
              />
            </Col>
            <Col>
              <ListField
                name="categories"
                label="Категория"
                options={categories}
                optionKey="id"
                optionValue="value"
                disabled={inProcess}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <SelectField
                require
                simple
                name="brandId"
                label="Бренд"
                options={brands}
                optionKey="id"
                optionValue="value"
                disabled={inProcess}
              />
            </Col>
            <Col>
              <InputField require name="name" label="Назвние" disabled={inProcess} />
            </Col>
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
      </div>

      <div className={styles['block']}>
        <div className={styles['header']}>
          <Header level={3}>Аттрибуты</Header>
        </div>
        <div className={styles['content']}>
          <FieldArray name="attributes" component={Attributes} disabled={inProcess} />
        </div>
      </div>

      <div className={styles['block']}>
        <div className={styles['header']}>
          <Header level={3}>План скидок</Header>
        </div>
        <div className={styles['content']}>
          <Row>
            <Col>
              <ListField
                name="promotions"
                label="Тип"
                options={promotions}
                optionKey="id"
                optionValue="name"
                disabled={inProcess}
              />
            </Col>
          </Row>
        </div>
      </div>

      <div className={styles['block']}>
        <div className={styles['header']}>
          <Header level={3}>Стоимость</Header>
        </div>
        <div className={styles['content']}>
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
          </Row>
        </div>
      </div>
    </form>
  );
}

export default ModifyForm;
