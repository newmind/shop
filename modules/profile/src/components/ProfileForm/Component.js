
import React from 'react';

import { Row, Col, InputField, DatePickerField } from '@ui.packages/kit';

import styles from './default.module.scss';


function FormModify({ disabled, handleSubmit }) {
  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <Row>
        <Col>
          <InputField
            label="Имя"
            name="name"
            disabled={disabled}
          />
        </Col>
        <Col>
          <InputField
            label="Фамилия"
            name="surname"
            disabled={disabled}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputField
            label="Телефон"
            name="phone"
            disabled={disabled}
          />
        </Col>
        <Col>
          <InputField
            label="E-mail"
            name="email"
            disabled={disabled}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <DatePickerField
            label="День рождения"
            name="birthday"
            disabled={disabled}
          />
        </Col>
        <Col />
      </Row>
    </form>
  );
}

export default FormModify;
