
import {
  Container,
  Row,
  Col,
  InputField,
  DatePickerField,
  Button,
  AvatarField,
  Radio,
  RadioBoxField
} from '@ui.packages/kit';

import types from 'prop-types';
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


class Block extends PureComponent {
  render() {
    const { children, selected, onClick } = this.props;
    const classNameBlock = cn(styles['block'], {
      [styles['block--selected']]: selected,
    });

    return (
      <div className={classNameBlock} onClick={onClick}>
        { children }
      </div>
    );
  }
}

class Component extends PureComponent {
  static propTypes = {
    isValid: types.bool,
    isPristine: types.bool,
    handleSubmit: types.func,
  };

  static defaultProps = {};

  render() {
    const { handleSubmit, valid, pristine } = this.props;
console.log(valid, pristine)
    return (
      <form className={styles['sign-up']} onSubmit={handleSubmit}>
        <Container>
          <Row>
            <Col>
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
                <Col>
                  <InputField label="Фамилия" name="surname" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputField label="Отчество" name="patronymic" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputField label="Телефон" name="phone" />
                </Col>
                <Col>
                  <DatePickerField label="Дата рождения" name="birthday" />
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <div className={styles['avatar']}>
                    <AvatarField
                      name="avatar"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className={styles['sex']}>
                    <RadioBoxField name="sex">
                      <Radio name="male">
                        <Block>
                          <i className={cn(styles['block__icon'], 'fas fa-male')} />
                        </Block>
                      </Radio>
                      <Radio name="female">
                        <Block>
                          <i className={cn(styles['block__icon'], 'fas fa-female')} />
                        </Block>
                      </Radio>
                    </RadioBoxField>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={styles['controls']}>
                <Button
                  type="submit"
                  mode="success"
                  disabled={ ! valid || pristine}
                >Регистрация</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </form>
    );
  }
}

export default Component;
