
import numeral from '@packages/numeral';
import { Button, Container, Col, Row, Select } from "@ui.packages/kit";

import types from 'prop-types';
import React, { useState } from 'react';

import styles from "./default.module.scss";


const coefficient = [
  { id: '1.56', value: '1.56', coast: 0.00 },
  { id: '1.6', value: '1.6', coast: 1000.00 },
  { id: '1.61', value: '1.61', coast: 1500.00 },
  { id: '1.67', value: '1.67', coast: 2000.00 },
  { id: '1.74', value: '1.74', coast: 2500.00 },
];

const coatings = [
  { id: 'hmc', value: 'HMC', coast: 0.00 },
  { id: 'blue-coating', value: 'Blue blocker', coast: 500.00 },
  { id: 'hmc+', value: 'HMC Plus', coast: 1000.00 },
  { id: 'lotos', value: 'Lotos', coast: 1500.00 },
];

const lensesTypes = [
  { id: 'lenticular', value: 'Лентикулярные', coast: 1000.00 },
  { id: 'office', value: 'Офисные', coast: 1500.00 },
  { id: 'polarizing', value: 'Поляризационные', coast: 1500.00 },
  { id: 'polarization-photochrome', value: 'Поляризационные/Фотохромные', coast: 3000.00 },
  { id: 'progressive', value: 'Прогрессивы', coast: 5000.00 },
  { id: 'photochrome', value: 'Фотохромные', coast: 2500.00 }
];

const designs = [
  { id: 'spherical', value: 'Сферическая', coast: 0.00 },
  { id: 'aspherical', value: 'Асферическая', coast: 2000.00 },
];


const defaultState = {
  index: coefficient[0],
  coating: coatings[0],
  type: null,
  design: designs[0],
};


function SelectLensesFormModify({ index, coating, type, design, value, onSubmit }) {
  const [state, setState] = useState({
    ...defaultState,
    ...value
  });

  function handleChange(key, value) {
    setState({ ...defaultState, [key]: value });
  }

  function handleSubmit() {
    onSubmit(state);
  }

  return (
    <Container className={styles['container']}>
      <Row>
        <Col>
          <div className={styles['coast']}>
            <div className={styles['coast__container']}>
              <Select label="Индекс (коэффициент утончения)" onChange={(value) => handleChange('index', value)} clearable={false} options={coefficient} value={index} />
            </div>
            <div className={styles['coast__value']}>
              <span>+ {index ? numeral(index['coast']).format() : 0.00} руб.</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={styles['coast']}>
            <div className={styles['coast__container']}>
              <Select label="Покрытие" onChange={(value) => handleChange('coating', value)} clearable={false} options={coatings} value={coating} />
            </div>
            <div className={styles['coast__value']}>
              <span>+ {coating ? numeral(coating['coast']).format() : 0.00} руб.</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={styles['coast']}>
            <div className={styles['coast__container']}>
              <Select label="Дизайн" onChange={(value) => handleChange('design', value)} clearable={false} options={designs} value={design} />
            </div>
            <div className={styles['coast__value']}>
              <span>+ {design ? numeral(design['coast']).format() : 0.00} руб.</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={styles['coast']}>
            <div className={styles['coast__container']}>
              <Select label="Тип" onChange={(value) => handleChange('type', value)} options={lensesTypes} value={type} />
            </div>
            <div className={styles['coast__value']}>
              <span>+ {type ? numeral(type['coast']).format() : 0.00} руб.</span>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col className={styles['controls']}>
          <Button mode="success" onClick={() => handleSubmit()}>Готово</Button>
        </Col>
      </Row>
    </Container>
  );
}

SelectLensesFormModify.propTypes = {
  lenses: types.array,
  onSubmit: types.func,
};

export default SelectLensesFormModify;
