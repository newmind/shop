
import { Row, Col, InputField, SelectField, DatePickerField, Button } from '@ui.packages/ui';

import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    const { handleSubmit, types, brands, categories, colors, forms, materials } = this.props;

    return (
      <form className={styles['form']} onSubmit={handleSubmit}>
        <Row>
          <Col><DatePickerField name="createdFrom" clearable /></Col>
          <Col><DatePickerField name="createdTo" clearable /></Col>
          <Col><InputField name="uuid" placeholder="UUID" /></Col>
          <Col><SelectField placeholder="Тип" name="typeId" clearable simple options={types} /></Col>
          <Col><SelectField placeholder="Бренд" name="brand" clearable simple options={brands} optionKey="value" /></Col>
        </Row>
        <Row>
          <Col><SelectField placeholder="Категория" name="categoryId" clearable simple options={categories} /></Col>
          <Col><SelectField placeholder="Цвет" name="colorId" clearable simple options={colors} /></Col>
          <Col><SelectField placeholder="Форма" name="formId" clearable simple options={forms} /></Col>
          <Col><SelectField placeholder="Материал" name="materialId" clearable options={materials} /></Col>
          <Col />
        </Row>
        <Row>
          <Col>
            <Button type="submit" mode="primary">Применить</Button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default Component;
