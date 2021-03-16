
import React from 'react';

import {Row, Col, InputField, SelectField, DatePickerField, Button} from '@ui.packages/kit';

import styles from './default.module.scss';
import {Mode} from "@ui.packages/types";
import {useSelector} from "react-redux";
import {getFormValues} from "redux-form";


function FormModify({ disabled, handleSubmit, valid, pristine }) {
  const values = useSelector(getFormValues('customer-settings'));

  if ( ! values) {
    return null;
  }

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <Row>
          <Col>
            <InputField
              require
              label="Фамилия"
              name="surname"
              disabled={disabled}
            />
          </Col>
          <Col>
            <InputField
              require
              label="Имя"
              name="name"
              disabled={disabled}
            />
          </Col>
          <Col>
            <InputField
              label="Отчество"
              name="patronymic"
              disabled={disabled}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField
              require
              label="Телефон"
              name="meta.phone"
              disabled={disabled}
            />
          </Col>
          <Col>
            <InputField
              require
              label="E-mail"
              name="meta.email"
              disabled={disabled}
            />
          </Col>
          <Col />
        </Row>
        <Row>
          <Col>
            <SelectField
              require
              simple
              label="Пол"
              name="gender"
              disabled={disabled}
              options={[
                { id: 'male', value: 'Мужской' },
                { id: 'female', value: 'Женский' },
              ]}
            />
          </Col>
          <Col>
            <DatePickerField
              require
              label="День рождения"
              name="birthday"
              disabled={disabled}
            />
          </Col>
          <Col />
        </Row>
      </div>
      <div className={styles['controls']}>
        <Button
          type={Button.TYPE_SUBMIT}
          mode={Mode.SUCCESS}
          disabled={ ! valid || pristine || disabled}
        >Сохранить</Button>
      </div>
    </form>
  );
}

export default FormModify;
