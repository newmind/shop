
import { Container, Row, Col, EvaluationField, InputField, TextareaField, Button } from '@ui.packages/kit';

import types from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    initialValues: types.object,
    handleSubmit: types.func,
  };

  static defaultProps = {};

  render() {
    const { handleSubmit, valid, pristine } = this.props;

    return (
      <form className={styles['form']} onSubmit={handleSubmit}>
        <Container>
          <Row>
            <Col>
              <EvaluationField label="Оценка" name="evaluation" size="l" mode="info" />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField label="Представьтесь" name="person" />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextareaField label="Комментарий" name="comment" />
            </Col>
          </Row>
          <Row>
            <Col className={styles['controls']}>
              <Button mode="success" disabled={ ! valid || pristine } type="submit">Отправить</Button>
            </Col>
          </Row>
        </Container>
      </form>
    );
  }
}

export default Component;
