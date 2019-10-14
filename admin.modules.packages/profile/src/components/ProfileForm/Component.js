
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Row, Col, InputField, DatePickerField } from '@ui.packages/ui';


class Component extends PureComponent {
  static propTypes = {
    options: types.array,
    disabled: types.bool,
  };

  static defaultProps = {
    options: [],
    disabled: false,
  };

  render() {
    const { disabled, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <InputField
              label="Имя"
              name="name"
              disabled={disabled}
            />
          </Col>
          <Col>
            <InputField
              label="Фамилия"
              name="surname"
              disabled={disabled}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField
              label="Телефон"
              name="phone"
              disabled={disabled}
            />
          </Col>
          <Col>
            <InputField
              label="E-mail"
              name="email"
              disabled={disabled}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <DatePickerField
              label="День рождения"
              name="birthday"
              disabled={disabled}
            />
          </Col>
          <Col />
        </Row>
      </form>
    );
  }
}

export default Component;
