
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Row, Col } from '@ui.packages/ui';

import EyeAndNose from './EyeAndNose';
import Blank from './Blank';

import styles from './default.module.scss';


class Component extends PureComponent {
  static defaultProps = {
    onChange: types.func,
  };

  constructor(props) {
    super(props);

    const { recipe } = this.props;

    this.state = {
      PDLeft: 'average',
      PDRight: 'average',
      sphRight: 'plano',
      sphLeft: 'plano',
      cylRight: 'plano',
      cylLeft: 'plano',
      axisRight: '0',
      axisLeft: '0',
      addRight: '0.00',
      addLeft: '0.00',
      ...recipe,
    };
  }

  _setValue(name, value) {
    const { onChange } = this.props;
    this.setState({ [name]: value }, () => onChange(this.state));
  }

  render() {
    const { PDLeft, PDRight, ...rest } = this.state;
    return (
      <div className={styles['params']}>
        <Row>
          <Col>
            <p className={styles['information']}>Определение растояния между переносицей и зрачком</p>
            <EyeAndNose PDLeft={PDLeft} PDRight={PDRight} onChange={this._setValue.bind(this)} />
          </Col>
        </Row>
        <Row>
          <Col className={styles['recipe']}>
            <p className={styles['information']}>Рецептурные данные, которые врач установил в ходе обследования. Данные вносятся из рецепта</p>
            <Blank {...rest} onChange={this._setValue.bind(this)} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Component;