
import { InputField, Row, Col } from '@ui.packages/kit'

import React, { PureComponent } from 'react';


class Component extends PureComponent {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} autoComplete="on">
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
