
import { Suggest } from '@ui.packages/yandex-map';
import { RadioBoxField, Radio, Container, Row, Col } from "@ui.packages/kit";

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
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Suggest name="address" label="Адрес доставки" />
          </Col>
        </Row>
        <Row>
          <Col>
            <RadioBoxField name="delivery" defaultValue="post">
              <Radio name="post">
                <Block>
                  <i className={cn(styles['block__icon'], 'far fa-envelope')} />
                  <span className={styles['block__caption']}>Доставка по почте</span>
                </Block>
              </Radio>
              <Radio name="courier">
                <Block>
                  <i className={cn(styles['block__icon'], 'fas fa-shipping-fast')} />
                  <span className={styles['block__caption']}>Доставка курьером</span>
                </Block>
              </Radio>
            </RadioBoxField>
          </Col>
        </Row>
      </Container>

    );
  }
}

export default Component;
