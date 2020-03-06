
import { Row, Col, InputField, SelectField, DatePickerField, Button } from '@ui.packages/ui';

import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form className={styles['form']} onSubmit={handleSubmit}>
        <Row>
          <Col><DatePickerField name="createdFrom" /></Col>
          <Col><DatePickerField name="createdTo" /></Col>
          <Col><InputField name="uuid" placeholder="UUID" /></Col>
          <Col><SelectField placeholder="Бренд" name="brand" /></Col>
          <Col><SelectField placeholder="Название" name="name" /></Col>
        </Row>
        <Row>
          <Col><SelectField placeholder="Тип" name="type" /></Col>
          <Col><SelectField placeholder="Категория" name="category" /></Col>
          <Col><SelectField placeholder="Цвет" name="color" /></Col>
          <Col/>
          <Col/>
        </Row>
        <Row>
          <Col><SelectField placeholder="Форма" name="form" /></Col>
          <Col><SelectField placeholder="Материал" name="material" /></Col>
        </Row>
        <Row>
          <div className={styles['controls']}>
            <Button type="submit" mode="primary">Применить</Button>
          </div>
        </Row>
      </form>
    );
  }
}

export default Component;
