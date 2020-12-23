
import { InputField, Row, Col } from '@ui.packages/kit'

import React from 'react';


function Form({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <InputField name="login" label="Логин" />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputField name="password" label="Пароль" type="password" />
        </Col>
      </Row>
    </form>
  );
}

export default Form;
