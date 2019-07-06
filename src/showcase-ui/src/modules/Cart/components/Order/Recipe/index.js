
import React, { PureComponent } from 'react';

import { Col, InputField, Row } from "@packages/ui";


class Component extends PureComponent {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default Component;
