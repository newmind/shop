
import { Mode } from "@ui.packages/types";
import { Text, Row, Col, InputField, Button } from '@ui.packages/kit';

import React from 'react';
import { useSelector } from 'react-redux';
import { getFormValues } from 'redux-form';

import styles from './default.module.scss';


function FormModify({ disabled, handleSubmit, valid, pristine }) {
  const values = useSelector(getFormValues('common-settings'));

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
              label="Логин"
              name="login"
              disabled={disabled}
            />
          </Col>
          <Col>
            <Text type={Text.TYPE_BODY} className={styles['role']}>{ values['role']['name'] }</Text>
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
