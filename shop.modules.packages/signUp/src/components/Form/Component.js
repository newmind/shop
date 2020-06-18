
import { Container, Row, Col, InputField, DatePickerField, Button } from '@ui.packages/kit';

import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form className={styles['sign-up']} onSubmit={handleSubmit}>
        <Container>
          <Row>
            <Col>
              <InputField label="Логин" name="login" />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField label="Пароль" type="password" name="password" />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField label="Имя" name="name" />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField label="Фамилия" name="surname" />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField label="Телефон" name="phone" />
            </Col>
          </Row>
          <Row>
            <Col>
              <DatePickerField label="Дата рождения" name="birthday" />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button type="submit" mode="success">Регистрация</Button>
            </Col>
          </Row>
        </Container>
      </form>
    );
  }
}

export default Component;
