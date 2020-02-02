
import { Row, Col, Hr, InputField, TextareaField, SelectField } from '@ui.packages/ui';

import { Field, FieldArray } from 'redux-form';
import React, { PureComponent } from 'react';

import AddImageForm from '../AddImageForm';
import AttrsForm from '../AttributesForm';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    const { handleSubmit, units, currencies, categories } = this.props;
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
              <Field name="gallery" path={`${process.env['REACT_APP_API_HOST']}/gallery`} component={AddImageForm}/>
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
              <SelectField
                name="category"
                label="Категория"
                options={categories}
                optionKey="id"
                optionValue="name"
              />
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
              <InputField name="color" label="Цвет" />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField name="material" label="Материал" />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField name="form" label="Форма" />
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
                optionKey="id"
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
