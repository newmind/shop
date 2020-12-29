
import { Suggest } from '@ui.packages/yandex-map';
import { RadioBoxField, InputField, Radio, Container, Row, Col } from "@ui.packages/kit";

import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Block({ children, selected, onClick }) {
  const classNameBlock = cn(styles['block'], {
    [styles['block--selected']]: selected,
  });

  return (
    <div className={classNameBlock} onClick={onClick}>
      { children }
    </div>
  );
}


function Delivery() {
  return (
    <Container>
      <Row>
        <Col>
          <RadioBoxField name="delivery" defaultValue="post">
            <Radio name="post">
              <Block>
                <i className={cn(styles['block__icon'], 'far fa-envelope')} />
                <span className={styles['block__caption']}>По почте</span>
              </Block>
            </Radio>
            <Radio name="courier">
              <Block>
                <i className={cn(styles['block__icon'], 'fas fa-shipping-fast')} />
                <span className={styles['block__caption']}>Курьером</span>
              </Block>
            </Radio>
          </RadioBoxField>
        </Col>
      </Row>
      <Row>
        <Col>
          <Suggest name="address" label="Адрес доставки" />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputField
            name="details"
            label="Дополнительно"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Delivery;
