
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { SelectField, InputField, Row, Col, Button } from '@ui.packages/ui';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    categories: types.array,
    brands: types.array,
  };

  static defaultProps = {
    categories: [],
    brands: [],
  };

  render() {
    const { handleSubmit, categories, brands, isValid } = this.props;
    return (
      <form onSubmit={handleSubmit} className={styles['wrapper']}>
        <div className={styles['fields']}>
          <Row>
            <Col>
              <SelectField
                label="Категория"
                name="categoryId"
                options={categories}
                optionValue="name"
                simple={true}
              />
            </Col>
            <Col>
              <SelectField
                label="Бренд"
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
              />
            </Col>
            <Col className={styles['amounts']}>
              <div className={styles['amount']}>
                <span className={styles['amount__label']}>Сумма</span>
                <span className={styles['amount__wrapper']}>
                    <InputField className={styles['amount__input']} name="amountFrom" />
                    <span className={styles['amount__delimiter']}>-</span>
                    <InputField className={styles['amount__input']} name="amountTo" />
                  </span>
              </div>
            </Col>
            <Col className={styles['controls']}>
              <Button type="submit" mode="primary" disabled={ ! isValid}>Применить</Button>
            </Col>
          </Row>
        </div>
      </form>
    );
  }
}

export default Component;
