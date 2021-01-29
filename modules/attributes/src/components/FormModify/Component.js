
import { Mode } from '@ui.packages/types';
import { Row, Col, Button, InputField, TextareaField, SelectField } from '@ui.packages/kit';

import React from 'react';
import { submit } from 'redux-form';
import { useSelector, useDispatch } from 'react-redux';

import styles from './default.module.scss';

import { selectUnits } from '../../ducks/slice';


export default ({ handleSubmit, valid, pristine }) => {
  const units = useSelector(selectUnits);
  const dispatch = useDispatch();

  function handleSubmitForm() {
    dispatch(submit('attr-modify'));
  }

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <Row>
          <Col>
            <InputField
              require
              name="value"
              label="Значение"
              maxLength={255}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectField
              simple={false}
              name="unit"
              label="Величина"
              options={units}
              optionKey="id"
              optionValue="value"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextareaField
              name="description"
              label="Описание"
              maxLength={1024}
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
        >Сохранить</Button>
      </div>
    </form>
  )
};
