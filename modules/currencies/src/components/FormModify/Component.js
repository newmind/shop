
import { Mode } from '@ui.packages/types';
import { Row, Col, Button, InputField, TextareaField } from '@ui.packages/kit';

import React from 'react';

import styles from './default.module.scss';


export default ({ handleSubmit, valid, pristine }) => {
  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <Row>
          <Col>
            <InputField
              name="value"
              label="Значение"
              maxLength={8}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField
              name="code"
              label="Код"
              maxLength={8}
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
        >Выполнить</Button>
      </div>
    </form>
  )
};
