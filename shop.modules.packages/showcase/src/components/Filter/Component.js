
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { SelectField, InputField, Row, Col, Button, CheckBoxField } from '@ui.packages/ui';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    inProcess: types.bool,
    categories: types.array,
    brands: types.array,
  };

  static defaultProps = {
    inProcess: false,
    categories: [],
    brands: [],
  };

  render() {
    const { handleSubmit, categories, brands, isValid, inProcess } = this.props;
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
                placeholder="Бренд"
                name="brand"
                optionKey="brand"
                optionValue="brand"
                options={brands}
                simple={true}
                optionTemplate={option => (
                  <span className={styles['option']}>
                    <span className={styles['option__title']}>{option['brand']}</span>
                    <span className={styles['option__count']}>({option['count']})</span>
                  </span>
                )}
                disabled={inProcess}
              />
            </Col>
            <Col>
              <SelectField
                placeholder="Цвет"
                name="color"
                options={[]}
                disabled={inProcess}
              />
            </Col>
          </Row>
          <Row>
            <Col className={styles['amounts']}>
              <div className={styles['amount']}>
                <span className={styles['amount__label']}>Сумма</span>
                <span className={styles['amount__wrapper']}>
                  <InputField className={styles['amount__input']} name="amountFrom" disabled={inProcess} />
                  <span className={styles['amount__delimiter']}>-</span>
                  <InputField className={styles['amount__input']} name="amountTo" disabled={inProcess} />
                </span>
              </div>
            </Col>
            <Col className={styles['align-centered']}>
              <Row>
                <Col><CheckBoxField label="Новинки" name="new" disabled={inProcess} /></Col>
                <Col><CheckBoxField label="Со скидкой" name="sale" disabled={inProcess} /></Col>
                <Col/>
                <Col/>
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
