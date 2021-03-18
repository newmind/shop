
import { Row, Col, InputField, TextareaField, Button } from '@ui.packages/kit';

import React from 'react';

import styles from './default.module.scss';


function Component({ handleSubmit }) {
  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <Row>
        <Col>
          <InputField
            label="Комментатор"
            name="person"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextareaField
            label="Комментарий"
            name="comment"
          />
        </Col>
      </Row>
      <Row>
        <Col className={styles['controls']}>
          <Button type="submit" mode="success">Сохранить</Button>
        </Col>
      </Row>
    </form>
  );
}

export default Component;
