
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { SelectField, InputField, Row, Col } from '@ui.packages/ui';

import styles from './default.module.scss';


const Option = (option) => (
  <span className={styles['option']}>
    <span className={styles['option__title']}>{option['value']}</span>
    <span className={styles['option__count']}>{option['count']}</span>
  </span>
);


class Component extends PureComponent {
  static propTypes = {
    types: types.array,
    categories: types.array,
    brands: types.array,
    colors: types.array,
    forms: types.array,
    materials: types.array,
    isValid: types.bool,
    inProcess: types.bool,
  };

  static defaultProps = {
    types: [],
    categories: [],
    brands: [],
    colors: [],
    forms: [],
    materials: [],
    isValid: false,
    inProcess: false,
  };

  _handleSubmit() {
    const { submit } = this.props;
    setTimeout(() => submit('filter-showcase-ui'), 100);
  }

  render() {
    const { handleSubmit, types, categories, brands, colors, forms, materials, inProcess } = this.props;

    return (
      <form onSubmit={handleSubmit} className={styles['wrapper']}>
        <div className={styles['fields']}>
          <div className={styles['line']}>
            <div className={styles['col']}>
              <SelectField
                placeholder="Тип"
                name="typeId"
                options={types}
                optionKey="id"
                optionValue="value"
                simple={true}
                optionTemplate={Option}
                disabled={inProcess}
                onChange={this._handleSubmit.bind(this)}
              />
            </div>
            <div className={styles['col']}>
              <SelectField
                placeholder="Категория"
                name="categoryId"
                options={categories}
                optionKey="id"
                optionValue="value"
                simple={true}
                optionTemplate={Option}
                disabled={inProcess}
                onChange={this._handleSubmit.bind(this)}
              />
            </div>
            <div className={styles['col']}>
              <SelectField
                placeholder="Цвет"
                name="colorId"
                optionKey="id"
                optionValue="value"
                options={colors}
                simple={true}
                optionTemplate={Option}
                disabled={inProcess}
                onChange={this._handleSubmit.bind(this)}
              />
            </div>
            <div className={styles['col']}>
              <SelectField
                placeholder="Материал"
                name="materialId"
                optionKey="id"
                optionValue="value"
                options={materials}
                simple={true}
                optionTemplate={Option}
                disabled={inProcess}
                onChange={this._handleSubmit.bind(this)}
              />
            </div>
          </div>
          <div className={styles['line']}>
            <div className={styles['col']}>
              <SelectField
                placeholder="Бренд"
                name="brand"
                optionKey="value"
                optionValue="value"
                options={brands}
                simple={true}
                optionTemplate={Option}
                disabled={inProcess}
                onChange={this._handleSubmit.bind(this)}
              />
            </div>
            <div className={styles['col']}>
              <SelectField
                placeholder="Форма"
                name="formId"
                optionKey="id"
                optionValue="value"
                options={forms}
                simple={true}
                optionTemplate={Option}
                disabled={inProcess}
                onChange={this._handleSubmit.bind(this)}
              />
            </div>
            <div className={styles['col']}>
              <Row>
                <Col>
                  <div className={styles['amount']}>
                    <span className={styles['amount__label']}>Сумма</span>
                    <span className={styles['amount__wrapper']}>
                      <InputField className={styles['amount__input']} name="amountFrom" disabled={inProcess} />
                      <span className={styles['amount__delimiter']}>-</span>
                      <InputField className={styles['amount__input']} name="amountTo" disabled={inProcess} />
                    </span>
                  </div>
                </Col>
              </Row>
            </div>
            <div className={styles['col']}>
              <p>more</p>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Component;
