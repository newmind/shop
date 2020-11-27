
import { InputField, Button, Row, Col } from '@ui.packages/kit';

import React from 'react';

import styles from './default.module.scss';


export default ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <InputField label="Логин" name="login" />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputField label="Пароль" name="password" />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={styles['controls']}>
            <Button type="submit" mode="success">Войти</Button>
          </div>
        </Col>
      </Row>
    </form>
  );
};
