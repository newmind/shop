
import { Mode } from '@ui.packages/types';
import { Row, Col, Button, InputField, SelectField, TextareaField } from '@ui.packages/kit';

import React from 'react';
import { submit } from "redux-form";
import { useDispatch, useSelector } from 'react-redux';

import styles from './default.module.scss';

import { selectItems } from '../../ducks/slice';


export default ({ handleSubmit, valid, pristine }) => {
  const categories = useSelector(selectItems);
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
            <SelectField
              name="parentId"
              label="Родительская категория"
              options={categories}
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
          type={Button.TYPE_SUBMIT}
          mode={Mode.SUCCESS}
          disabled={ ! valid || pristine}
          onClick={handleSubmitForm}
        >Выполнить</Button>
      </div>
    </form>
  )
};
