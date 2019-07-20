
import React, { PureComponent } from 'react';

import { Row, Col, SelectField, CheckBox } from '@ui.packages/ui';

import styles from './default.module.scss';


class Component extends PureComponent {
  static defaultProps = {
    values: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      isPDTwo: false,
    };
  }

  render() {
    const { isPDTwo } = this.state;
    return (
      <div className={styles['params']}>
        <div><CheckBox value={isPDTwo} onChange={value => this.setState({ isPDTwo: ! value })}/>У меня два значения PD</div>
        { ! isPDTwo
        ? (<Row>
            <Col>
              <SelectField
                label="Межзрачковое расстояние"
                name="PD"
                options={[
                  { id: 'average', value: 'Использовать среднее значение (Я не знаю свой PD)' },
                  { id: '50.0', value: '50.0' },
                  { id: '50.5', value: '50.5' },
                  { id: '51.0', value: '51.0' },
                  { id: '51.5', value: '51.5' },
                  { id: '52.0', value: '52.0' },
                  { id: '52.5', value: '52.5' },
                  { id: '53.0', value: '53.0' },
                  { id: '53.5', value: '53.5' },
                  { id: '54.0', value: '54.0' },
                  { id: '54.5', value: '54.5' },
                  { id: '55.0', value: '55.0' },
                  { id: '55.5', value: '55.5' },
                  { id: '56.0', value: '56.0' },
                  { id: '56.1', value: '56.1' },
                  { id: '57.0', value: '57.0' },
                  { id: '57.5', value: '57.5' },
                  { id: '58.0', value: '58.0' },
                  { id: '58.5', value: '58.5' },
                  { id: '59.0', value: '59.0' },
                  { id: '59.5', value: '59.5' },
                  { id: '60.0', value: '60.0' },
                  { id: '60.5', value: '60.5' },
                  { id: '61.0', value: '61.0' },
                  { id: '61.5', value: '61.5' },
                  { id: '62.0', value: '62.0' },
                  { id: '62.5', value: '62.5' },
                  { id: '63.0', value: '63.0' },
                  { id: '63.5', value: '63.5' },
                  { id: '64.0', value: '64.0' },
                  { id: '64.5', value: '64.5' },
                  { id: '65.0', value: '65.0' },
                  { id: '65.5', value: '65.5' },
                  { id: '66.0', value: '66.0' },
                  { id: '66.5', value: '66.5' },
                  { id: '67.0', value: '67.0' },
                  { id: '67.5', value: '67.5' },
                  { id: '68.0', value: '68.0' },
                  { id: '68.5', value: '68.5' },
                  { id: '69.0', value: '69.0' },
                  { id: '69.5', value: '69.5' },
                  { id: '70.0', value: '70.0' },
                  { id: '70.5', value: '70.5' },
                  { id: '71.0', value: '71.0' },
                  { id: '71.5', value: '71.5' },
                  { id: '72.0', value: '72.0' },
                  { id: '72.5', value: '72.5' },
                  { id: '73.0', value: '73.0' },
                  { id: '73.5', value: '73.5' },
                  { id: '74.0', value: '74.0' },
                  { id: '74.5', value: '74.5' },
                  { id: '75.0', value: '75.0' },
                  { id: '75.5', value: '75.5' },
                  { id: '76.0', value: '76.0' },
                  { id: '76.5', value: '76.5' },
                  { id: '77.0', value: '77.0' },
                  { id: '77.5', value: '77.5' },
                  { id: '78.0', value: '78.0' },
                  { id: '78.5', value: '78.5' },
                  { id: '79.0', value: '79.0' },
                  { id: '79.5', value: '79.5' },
                  { id: '80.5', value: '80.0' },
                ]}
              />
            </Col>
          </Row>)
        : (
        <Row>
          <Col>
            <SelectField
              label="Межзрачковое расстояние (Левый глаз)"
              name="PD-left"
              options={[
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
              ]}
            />
          </Col>
          <Col>
            <SelectField
              label="Межзрачковое расстояние (Правый глаз)"
              name="PD-right"
              options={[
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
              ]}
            />
          </Col>
        </Row>)}
        <Row>
          <Col>
            <h3>Левый глаз</h3>
            <Row>
              <Col><SelectField label="SPH (Сфера)" name="sph-left" /></Col>
              <Col><SelectField label="CYL (Цилиндр)" name="cyl-left" /></Col>
            </Row>
            <Row>
              <Col><SelectField label="AXIS (Ось)" name="axis-left" /></Col>
              <Col><SelectField label="ADD (Дополнение)" name="add-left" /></Col>
            </Row>
          </Col>
          <Col>
            <h3>Правый глаз</h3>
            <Row>
              <Col><SelectField label="SPH (Сфера)" name="sph-right" /></Col>
              <Col><SelectField label="CYL (Цилиндр)" name="cyl-right" /></Col>
            </Row>
            <Row>
              <Col><SelectField label="AXIS (Ось)" name="axis-right" /></Col>
              <Col><SelectField label="ADD (Дополнение)" name="add-right" /></Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Component;