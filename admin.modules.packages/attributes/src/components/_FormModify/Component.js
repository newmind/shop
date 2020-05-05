
import { Row, Col, Button, InputField, TextareaField } from '@ui.packages/ui';

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
              lable="Значение"
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
          type="submit"
          mode="success"
          disabled={ ! valid || pristine}
        >Выполнить</Button>
      </div>
    </form>
  )
};
