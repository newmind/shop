
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { SelectField, InputField, Row, Col, Button } from '@ui.packages/ui';

import styles from './default.module.scss';


const BrandOption = (option) => (
  <span className={styles['option']}>
    <span className={styles['option__title']}>{option['brand']}</span>
    <span className={styles['option__count']}>{option['count']}</span>
  </span>
);

const ColorOption = (option) => (
  <span className={styles['option']}>
    <span className={styles['option__title']}>{option['color']}</span>
    <span className={styles['option__count']}>{option['count']}</span>
  </span>
);

const FormOption = (option) => (
  <span className={styles['option']}>
    <span className={styles['option__title']}>{option['form']}</span>
    <span className={styles['option__count']}>{option['count']}</span>
  </span>
);

const MaterialOption = (option) => (
  <span className={styles['option']}>
    <span className={styles['option__title']}>{option['material']}</span>
    <span className={styles['option__count']}>{option['count']}</span>
  </span>
);


class Component extends PureComponent {
  static propTypes = {
    categories: types.array,
    brands: types.array,
    inProcess: types.bool,
  };

  static defaultProps = {
    categories: [],
    brands: [],
    inProcess: false,
  };

  _handleSubmit() {
    const { submit } = this.props;
    submit('filter-showcase-ui');
  }

  render() {
    const { handleSubmit, categories, brands, colors, forms, materials, isValid, inProcess } = this.props;
    return (
      <form onSubmit={handleSubmit} className={styles['wrapper']}>
        <div className={styles['fields']}>
          <Row>
            <Col>
              <SelectField
                placeholder="Категория"
                name="categoryId"
                options={categories}
                optionValue="name"
                simple={true}
                disabled={inProcess}
              />
            </Col>
            <Col>
              <SelectField
                placeholder="Цвет"
                name="color"
                optionKey="color"
                optionValue="color"
                options={colors}
                simple={true}
                optionTemplate={ColorOption}
                disabled={inProcess}
              />
            </Col>
            <Col>
              <SelectField
                placeholder="Материал"
                name="material"
                optionKey="material"
                optionValue="material"
                options={materials}
                simple={true}
                optionTemplate={MaterialOption}
                disabled={inProcess}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <SelectField
                placeholder="Бренд"
                name="brand"
                optionKey="brand"
                optionValue="brand"
                options={brands}
                simple={true}
                optionTemplate={BrandOption}
                disabled={inProcess}
              />
            </Col>
            <Col className={styles['amounts']}>
              <SelectField
                placeholder="Форма"
                name="form"
                optionKey="form"
                optionValue="form"
                options={forms}
                simple={true}
                optionTemplate={FormOption}
                disabled={inProcess}
              />
            </Col>
            <Col className={styles['align-centered']}>
              <Row>
                <Col>
                  {/*<Col className={styles['amounts']}>*/}
                  <div className={styles['amount']}>
                    <span className={styles['amount__label']}>Сумма</span>
                    <span className={styles['amount__wrapper']}>
                      <InputField className={styles['amount__input']} name="amountFrom" disabled={inProcess} />
                      <span className={styles['amount__delimiter']}>-</span>
                      <InputField className={styles['amount__input']} name="amountTo" disabled={inProcess} />
                    </span>
                  </div>
                </Col>
                {/*<Col><CheckBoxField label="Новинки" name="new" disabled={inProcess} /></Col>*/}
                {/*<Col><CheckBoxField label="Со скидкой" name="sale" disabled={inProcess} /></Col>*/}
              </Row>
            </Col>
          </Row>
        </div>
        <div className={styles['controls']}>
          <Button type="submit" mode="primary" disabled={ ! isValid}>Применить</Button>
        </div>
      </form>
    );
  }
}

export default Component;
