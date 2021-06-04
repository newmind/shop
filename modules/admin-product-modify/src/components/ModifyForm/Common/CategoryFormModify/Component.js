
import { Mode } from '@ui.packages/types';
import { Row, Col, Button, InputField, TextareaField } from '@ui.packages/kit';

import React from 'react';
import { submit } from "redux-form";
import { useDispatch } from 'react-redux';

import styles from './default.module.scss';


export default ({ handleSubmit, valid, pristine }) => {
  const dispatch = useDispatch();

  function handleSubmitForm() {
    dispatch(submit('category-modify'));
  }

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <Row>
          <Col>
            <InputField
              name="value"
              label="Значение"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextareaField
              name="description"
              label="Описание"
            />
          </Col>
        </Row>
      </div>
      <div className={styles['controls']}>
        <Button
          type={Button.TYPE_BUTTON}
          mode={Mode.SUCCESS}
          disabled={ ! valid || pristine}
          onClick={() => handleSubmitForm()}
        >Выполнить</Button>
      </div>
    </form>
  )
};
