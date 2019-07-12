
import React, { PureComponent } from 'react';

import { InputField, Row, Col } from '@ui.packages/ui'


class Component extends PureComponent {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} autoComplete="off">
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
}

export default Component;
