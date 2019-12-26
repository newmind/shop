
import React, { PureComponent } from 'react';

import { Container, Col, InputField, Row } from "@ui.packages/ui";


class Component extends PureComponent {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <InputField label="Имя" name="name" placeholder="Василий" />
          </Col>
          <Col>
            <InputField label="Фамилия" name="surname" placeholder="Петров" />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField label="Номер телефона" name="phone" placeholder="+7 (xxx) xxx-xx-xx" />
          </Col>
          <Col>
            <InputField label="E-Mail" name="email" placeholder="example@host.so" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Component;
