
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Row, Col, InputField, TextariaField } from '@packages/ui';

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
              label="Название"
              name="name"
              disabled={disabled}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextariaField
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
