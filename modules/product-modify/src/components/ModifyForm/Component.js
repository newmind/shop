
import { Row, Col, InputField, TextareaField, SelectField } from '@ui.packages/kit';

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
      <div className={styles['form']}>
        <Row>
          <Col>
            <h3 className="header-3">Изображения</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Field name="gallery" path={`${process.env['REACT_APP_API_HOST']}/gallery`} component={AddImageForm} onDelete={onDelete} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="header-3">Основные аттрибуты</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField name="brand" label="Бренд" />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField name="name" label="Назвние" />
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectField
              name="typeId"
              label="Тип"
              options={types}
              optionKey="id"
              optionValue="value"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectField
              name="categoryId"
              label="Категория"
              options={categories}
              optionKey="id"
              optionValue="value"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectField
              name="colorId"
              label="Цвет"
              options={colors}
              optionKey="id"
              optionValue="value"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectField
              name="materialId"
              label="Материал"
              options={materials}
              optionKey="id"
              optionValue="value"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectField
              name="formId"
              label="Форма"
              options={forms}
              optionKey="id"
              optionValue="value"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextareaField name="description" label="Описание" />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="header-3">Дополнительно</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectField
              label="Дополнительные данные"
              simple
              options={[{ id: 'further', value: 'Рецепт' }]}
              name="params"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="header-3">Склад</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField name="amount" label="Цена" />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField name="saleAmount" label="Цена со скидкой" />
          </Col>
        </Row>
        <Row>
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
        <Row>
          <Col>
            <InputField name="count" label="Количество" />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="header-3">Дополнительные аттрибуты</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <FieldArray name="attributes" units={units} component={AttrsForm} />
          </Col>
        </Row>
      </div>
    </form>
  );
}

export default ModifyForm;
