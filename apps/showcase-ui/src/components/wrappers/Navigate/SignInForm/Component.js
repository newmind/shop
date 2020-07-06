
import { InputField, Button, Row, Col } from '@ui.packages/kit';

import React from 'react';


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
          <Button type="submit">Авторизация</Button>
        </Col>
      </Row>
    </form>
  );
};