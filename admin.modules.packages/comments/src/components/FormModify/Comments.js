
import { Row, Col, InputField, TextareaField, Button } from '@ui.packages/kit';

import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {

  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className={styles['form']} onSubmit={handleSubmit}>
        <Row>
          <Col>
            <InputField
              label="Комментатор"
              name="person"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextareaField
              label="Комментарий"
              name="comment"
            />
          </Col>
        </Row>
        <Row>
          <Col className={styles['controls']}>
            <Button type="submit" mode="success">Сохранить</Button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default Component;
