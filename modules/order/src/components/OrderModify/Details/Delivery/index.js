
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
          <Row>
            <Col>
              <RadioBoxField name="delivery" defaultValue="post">
                <Radio name="post">
                  <Block>
                    <i className={cn(styles['block__icon'], 'fas fa-people-carry')} />
                    <span className={styles['block__caption']}>Самовывоз</span>
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
              <Suggest
                name="address"
                label="Адрес доставки"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField
                name="house"
                label="Корпус"
              />
            </Col>
            <Col>
              <InputField
                name="front"
                label="Подъезд"
              />
            </Col>
            <Col>
              <InputField
                name="floor"
                label="Этаж"
              />
            </Col>
            <Col>
              <InputField
                name="flat"
                label="Квартра"
              />
            </Col>
          </Row>
        </Col>
        <Col>

        </Col>
      </Row>
    </Container>
  );
}

export default Delivery;
