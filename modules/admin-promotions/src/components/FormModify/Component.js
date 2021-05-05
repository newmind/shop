
import { Mode } from '@ui.packages/types';
import { Row, Col, Button, InputField, TextareaField, DatePickerField } from '@ui.packages/kit';

import React from 'react';

import styles from './default.module.scss';


export default ({ handleSubmit, valid, pristine }) => {
  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <Row>
          <Col>
            <InputField
              name="name"
              label="Название"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField
              name="percent"
              label="Скидка (%)"
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
        <Row>
          <Col>
            <DatePickerField
              name="dateFrom"
              label="От"
            />
          </Col>
          <Col>
            <DatePickerField
              name="dateTo"
              label="По"
            />
          </Col>
        </Row>
      </div>
      <div className={styles['controls']}>
        <Button
          type={Button.TYPE_SUBMIT}
          mode={Mode.SUCCESS}
          disabled={ ! valid || pristine}
        >Выполнить</Button>
      </div>
    </form>
  )
};
