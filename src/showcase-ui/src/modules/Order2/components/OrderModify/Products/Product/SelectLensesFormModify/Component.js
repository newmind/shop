
import types from 'prop-types';
import React, { PureComponent } from 'react';

import {Button, Container, Col, Row, Select} from "@ui.packages/ui";

import styles from "./default.module.scss";

const coatings = [
  { id: 'blue-coating', value: 'Blue blocker', description: 'Защита глаз от сине-голубого света, источниками которого являются компьютеры, гаджеты, телевизор и источники дневного света', amount: 200 },
  { id: 'hmc', value: 'HMC', description: 'Включает в себя упрочняющий, антибликовый слои', amount: 400 },
  { id: 'hmc+', value: 'HMC Plus', description: 'Улучшенное HMS покрытие. Добавлены антистатические и олеофобные свойства', amount: 500 },
  { id: 'lotos', value: 'Lotos', description: 'Премиальное покрытие. Обладает олеофобным свойством, двухсторонним широкополосным просветляющим и упрочняющим покрытием, антистатическим и УФ защитой до 400hM', amount: 600 },
];

const lensesTypes = [
  { id: 'lenticular', value: 'Лентикулярные', description: '', amount: 200 },
  { id: 'office', value: 'Офисные', description: '', amount: 300 },
  { id: 'polarizing', value: 'Поляризационные', description: '', amount: 400 },
  { id: 'polarization-photochrome', value: 'Поляризационные/Фотохромные', description: '', amount: 500 },
  { id: 'progressive', value: 'Прогрессивы', description: '', amount: 600 },
  { id: 'photochrome', value: 'Фотохромные', description: '', amount: 700 }
];

const designs = [
  { id: 'aspherical', value: 'Асферическая', description: '', amount: 0 },
  { id: 'spherical', value: 'Сферическая', description: '', amount: 300 },
];


class Component extends PureComponent {
  static propTypes = {
    lenses: types.array,
    onSubmit: types.func,
  };

  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      index: null,
      coating: null,
      type: null,
      design: null,
      ...value,
    };
  }

  _handleChange(key, value) {
    this.setState({[key]: value});
  }

  _handleSubmit() {
    const { onSubmit } = this.props;
    onSubmit(this.state);
  }

  render() {
    const { index, coating, type, design } = this.state;
    return (
      <Container className={styles['container']}>
        <Row>
          <Col>
            <Select label="Индекс (коэффициент утоньчения)" onChange={this._handleChange.bind(this, 'index')} options={['1.56', '1.6', '1.61', '1.67', '1.74']} value={index} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Select label="Покрытие" onChange={this._handleChange.bind(this, 'coating')} options={coatings} value={coating} />
            {coating && (<div className={styles['description']}>
              <p className={styles['description__content']}>{coating['description']}</p>
            </div>)}
          </Col>
        </Row>
        <Row>
          <Col>
            <Select label="Тип" onChange={this._handleChange.bind(this, 'type')} options={lensesTypes} value={type} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Select label="Дизайн" onChange={this._handleChange.bind(this, 'design')} options={designs} value={design} />
          </Col>
        </Row>
        <Row>
          <Col className={styles['controls']}>
            <Button mode="success" onClick={this._handleSubmit.bind(this)}>Готово</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Component;
