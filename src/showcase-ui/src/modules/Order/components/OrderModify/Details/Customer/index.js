
import React, { PureComponent } from 'react';

import { Container, Col, InputField, Row } from "@ui.packages/ui";


class Component extends PureComponent {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <InputField label="Имя" name="name" />
          </Col>
          <Col>
            <InputField label="Фамилия" name="surname" />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField label="Номер телефона" name="phone" />
          </Col>
          <Col>
            <InputField label="E-Mail" name="email" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Component;
