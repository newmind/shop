
import { Row, Col, InputField, TextareaField, Button } from '@ui.packages/ui';

import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {

  };

  render() {
    return (
      <form className={styles['form']}>
        <Row>
          <Col>
            <InputField
              name="person"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextareaField name="comment" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="submit">Сохранить</Button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default Component;
