
import { Row, Col, InputField, TextareaField, SelectField, Header } from '@ui.packages/kit';

import React from 'react';
import { useSelector } from 'react-redux';
import { Field, FieldArray } from 'redux-form';

import AddImageForm from '../AddImageForm';
import AttrsForm from '../AttributesForm';

import styles from './default.module.scss';

import { selectTypes, selectCategories, selectColors, selectMaterials, selectForms, selectCurrencies, selectUnits } from '../../ducks/slice';


function ModifyForm({ handleSubmit, onDelete }) {
  const types = useSelector(selectTypes);
  const units = useSelector(selectUnits);
  const forms = useSelector(selectForms);
  const colors = useSelector(selectColors);
  const materials = useSelector(selectMaterials);
  const categories = useSelector(selectCategories);
  const currencies = useSelector(selectCurrencies);

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
              <InputField name="fiscal" label="Фискальный номер" />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField require name="brand" label="Бренд" />
            </Col>
            <Col>
              <InputField require name="name" label="Назвние" />
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
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <SelectField
                name="colors"
                label="Цвет"
                type={SelectField.TYPE_MULTISELECT}
                options={colors}
                optionKey="id"
                optionValue="value"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <SelectField
                name="materials"
                label="Материал"
                type={SelectField.TYPE_MULTISELECT}
                options={materials}
                optionKey="id"
                optionValue="value"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <SelectField
                name="forms"
                label="Форма"
                type={SelectField.TYPE_MULTISELECT}
                options={forms}
                optionKey="id"
                optionValue="value"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextareaField require name="description" label="Описание" />
            </Col>
          </Row>
        </div>
      </div>

      <div className={styles['block']}>
        <div className={styles['header']}>
          <Header level={3}>Аттрибуты</Header>
        </div>
        <div className={styles['content']}>
          <FieldArray name="attributes" units={units} component={AttrsForm} />
        </div>
      </div>

      <div className={styles['block']}>
        <div className={styles['header']}>
          <Header level={3}>Дополнительные</Header>
        </div>
        <div className={styles['content']}>
          <Row>
            <Col>
              <SelectField
                label="Дополнительные данные"
                simple
                options={[{ id: 'further', value: 'Рецепт' }]}
                name="params"
              />
            </Col>
            <Col />
            <Col />
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
              <InputField name="amount" label="Цена" />
            </Col>
            <Col>
              <InputField name="saleAmount" label="Цена со скидкой" />
            </Col>
            <Col>
              <SelectField
                name="currencyId"
                label="Валюта"
                options={currencies}
                optionKey="uuid"
                optionValue="value"
              />
            </Col>
          </Row>
        </div>
      </div>
    </form>
  );
}

export default ModifyForm;
