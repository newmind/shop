
import { Row, Col, InputField, TextareaField, SelectField, Header } from '@ui.packages/kit';

import React from 'react';
import { useSelector } from 'react-redux';
import { Field, FieldArray } from 'redux-form';

import AddImageForm from '../AddImageForm';
import AttrsForm from '../AttributesForm';

import styles from './default.module.scss';

import { selectTypes, selectCategories, selectCurrencies, selectInProcess } from '../../ducks/slice';


function ModifyForm({ handleSubmit, onDelete }) {
  const types = useSelector(selectTypes);
  const categories = useSelector(selectCategories);
  const currencies = useSelector(selectCurrencies);
  const inProcess = useSelector(selectInProcess);

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['block']}>
        <div className={styles['header']}>
          <Header level={3}>Изображения</Header>
        </div>
        <div className={styles['content']}>
          <Field name="gallery" path={`${process.env['REACT_APP_API_HOST']}/gallery`} component={AddImageForm} onDelete={onDelete} />
        </div>
      </div>

      <div className={styles['block']}>
        <div className={styles['header']}>
          <Header level={3}>Основные</Header>
        </div>
        <div className={styles['content']}>
          <Row>
            <Col>
              <InputField name="uuid" label="Номер товара" disabled />
            </Col>
            <Col>
              <InputField name="fiscal" label="Фискальный номер" disabled={inProcess} />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField require name="brand" label="Бренд" disabled={inProcess} />
            </Col>
            <Col>
              <InputField require name="name" label="Назвние" disabled={inProcess} />
            </Col>
          </Row>
          <Row>
            <Col>
              <SelectField
                name="types"
                label="Тип"
                type={SelectField.TYPE_MULTISELECT}
                options={types}
                optionKey="id"
                optionValue="value"
                disabled={inProcess}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <SelectField
                name="categories"
                label="Категория"
                type={SelectField.TYPE_MULTISELECT}
                options={categories}
                optionKey="id"
                optionValue="value"
                disabled={inProcess}
              />
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
          <FieldArray
            name="attributes"
            disabled={inProcess}
            component={AttrsForm}
          />
        </div>
      </div>

      <div className={styles['block']}>
        <div className={styles['header']}>
          <Header level={3}>Стоимость</Header>
        </div>
        <div className={styles['content']}>
          <Row>
            <Col>
              <InputField require name="amount" label="Цена" disabled={inProcess} />
            </Col>
            <Col>
              <InputField name="saleAmount" label="Цена со скидкой" disabled={inProcess} />
            </Col>
            <Col>
              <SelectField
                require
                name="currencyId"
                label="Валюта"
                options={currencies}
                optionKey="uuid"
                optionValue="value"
                disabled={inProcess}
              />
            </Col>
          </Row>
        </div>
      </div>
    </form>
  );
}

export default ModifyForm;
