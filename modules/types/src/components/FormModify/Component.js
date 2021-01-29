
import { Mode } from '@ui.packages/types';
import { Row, Col, Button, InputField, TextareaField, SelectField } from '@ui.packages/kit';

import React from 'react';
import { submit } from "redux-form";
import { useDispatch, useSelector } from 'react-redux';

import styles from './default.module.scss';

import { selectCategories } from '../../ducks/slice';


export default ({ handleSubmit, valid, pristine }) => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  function handleSubmitForm() {
    dispatch(submit('types-modify'));
  }

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <Row>
          <Col>
            <InputField
              name="value"
              label="Значение"
              maxLength={255}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectField
              name="categories"
              label="Привязанная категория"
              type={SelectField.TYPE_MULTISELECT}
              options={categories}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextareaField
              name="description"
              label="Описание"
              maxLength={2024}
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
