
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Container, Row, Col, EvaluationField, InputField, TextariaField, Button } from '@ui.packages/ui';

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
              <EvaluationField name="evaluation" mode="info" />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField label="Представтесь" name="person" />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextariaField label="Комментарий" name="comment" />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button mode="success" disabled={ ! valid || pristine } type="submit">Отправить</Button>
            </Col>
          </Row>
        </Container>
      </form>
    );
  }
}

export default Component;
