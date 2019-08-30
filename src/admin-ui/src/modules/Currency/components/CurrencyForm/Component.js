
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Row, Col, InputField, TextareaField } from '@ui.packages/ui';

import styles from './default.module.scss';


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
      <form onSubmit={handleSubmit} className={styles['form']}>
        <Row>
          <Col>
            <InputField
              label="Значение"
              name="value"
              disabled={disabled}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextareaField
              label="Описание"
              name="description"
              disabled={disabled}
            />
          </Col>
        </Row>
      </form>
    );
  }
}

export default Component;
