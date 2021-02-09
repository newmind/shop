
import { Suggest } from '@ui.packages/yandex-map';
import { RadioBoxField, Radio, Container, Row, Col } from "@ui.packages/kit";

import React from 'react';
import { useSelector } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';

import { selectDeliveries } from '../../../../ducks/slice';


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
  const deliveries = useSelector(selectDeliveries);

  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <Col>
              <RadioBoxField name="delivery" defaultValue="post">
                {deliveries.map((delivery, index) => (
                  <Radio key={index} name={delivery['code']}>
                    <Block>
                      <span className={styles['block__caption']}>{ delivery['name'] }</span>
                    </Block>
                  </Radio>
                ))}
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
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default Delivery;
