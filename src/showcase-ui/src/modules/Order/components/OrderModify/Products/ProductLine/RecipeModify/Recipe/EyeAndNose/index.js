
import types from 'prop-types';
import React, { PureComponent } from 'react';

import {Row, Col, Select} from '@ui.packages/ui';

const eyeAndNose = [
  { id: 'average', value: 'Использовать среднее значение (Я не знаю свой PD)' },
  { id: '25.0', value: '25.0' },
  { id: '25.5', value: '25.5' },
  { id: '26.0', value: '26.0' },
  { id: '26.5', value: '26.5' },
  { id: '27.0', value: '27.0' },
  { id: '27.5', value: '27.5' },
  { id: '28.0', value: '28.0' },
  { id: '28.5', value: '28.5' },
  { id: '29.0', value: '29.0' },
  { id: '29.5', value: '29.5' },
  { id: '30.0', value: '30.0' },
  { id: '30.5', value: '30.5' },
  { id: '31.0', value: '31.0' },
  { id: '31.5', value: '31.5' },
  { id: '32.0', value: '32.0' },
  { id: '32.5', value: '32.5' },
  { id: '33.0', value: '33.0' },
  { id: '33.5', value: '33.5' },
  { id: '34.0', value: '34.0' },
  { id: '34.5', value: '34.5' },
  { id: '35.0', value: '35.0' },
  { id: '35.5', value: '35.5' },
  { id: '36.0', value: '36.0' },
  { id: '36.5', value: '36.5' },
  { id: '37.0', value: '37.0' },
  { id: '37.5', value: '37.5' },
  { id: '38.0', value: '38.0' },
  { id: '38.5', value: '38.5' },
  { id: '39.0', value: '39.0' },
  { id: '39.5', value: '39.5' },
  { id: '40.0', value: '40.0' },
];


class Component extends PureComponent {
  static propTypes = {
    PDLeft: types.string,
    PDRight: types.string,
    onChange: types.func,
  };

  render() {
    const { PDLeft, PDRight, onChange } = this.props;
    return (
      <Row>
        <Col>
          <Select
            label="Левый глаз"
            clearable={false}
            simple={true}
            value={PDLeft}
            options={eyeAndNose}
            onChange={(value) => onChange('PDLeft', value)}
          />
        </Col>
        <Col>
          <Select
            label="Правый глаз"
            clearable={false}
            simple={true}
            value={PDRight}
            options={eyeAndNose}
            onChange={(value) => onChange('PDRight', value)}
          />
        </Col>
      </Row>
    );
  }
}

export default Component;
