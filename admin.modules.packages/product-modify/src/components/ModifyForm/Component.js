
import { Row, Col, Hr, InputField, TextareaField, SelectField } from '@ui.packages/ui';

import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Field, FieldArray } from 'redux-form';

import AddImageForm from '../AddImageForm';
import AttrsForm from '../AttributesForm';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    units: types.array,
    types: types.array,
    forms: types.array,
    colors: types.array,
    materials: types.array,
    currencies: types.array,
    categories: types.array,
  };

  static defaultProps = {
    units: [],
    types: [],
    forms: [],
    colors: [],
    materials: [],
    currencies: [],
    categories: [],
  };

  render() {
    const { handleSubmit, units, currencies, types, categories, materials, colors, forms, onDelete } = this.props;

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
          <Hr className={styles['delimiter']} />
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
                name="type"
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
                name="category"
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
                name="color"
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
                name="material"
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
                name="form"
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
          <Hr className={styles['delimiter']} />
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
          <Hr className={styles['delimiter']} />
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
                name="currency"
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
          <Hr className={styles['delimiter']} />
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
}

export default Component;
