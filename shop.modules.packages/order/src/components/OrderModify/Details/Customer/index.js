
import React, { PureComponent } from 'react';

import { Container, Col, InputField, MaskInputField, Row } from "@ui.packages/ui";


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
            <MaskInputField label="Номер телефона" name="phone" placeholder="+7 (___) ___-__-__" mask="+7 (999) 999-99-99" />
          </Col>
          <Col>
            <InputField label="E-Mail" name="email" placeholder="example@mail.su" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Component;
