
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Container, Row, Col, Button, RadioBoxField } from '@ui.packages/ui';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    onNext: types.func,
    onSubmit: types.func,
  };

  _handleNext() {
    const { onNext } = this.props;
    onNext('select-lenses');
  }

  render() {
    return (
      <Container className={styles['container']}>
        <Row>
          <Col className={styles['content']}>

          </Col>
        </Row>
        <Row>
          <Col className={styles['controls']}>
            <Button mode="primary" onClick={this._handleNext.bind(this)}>Далее</Button>
            <Button mode="success">Готово</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Component;