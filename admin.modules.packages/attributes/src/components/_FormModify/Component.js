
import { Row, Col, Button, InputField, TextareaField } from '@ui.packages/ui';

import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form className={styles['form']} onSubmit={handleSubmit}>
        <Row>
          <Col>
            <InputField
              name="value"
              lable="Значение"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextareaField
              name="description"
              label="Описание"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="submit">Выполнить</Button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default Component;
