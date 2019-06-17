
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { SelectField, Row, Col, Button } from '@packages/ui';

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
    const { handleSubmit, categories, brands } = this.props;
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
                options={brands}
              />
            </Col>
          </Row>
        </div>
        <div className={styles['controls']}>
          <Button type="submit" mode="primary">Применить</Button>
        </div>
      </form>
    );
  }
}

export default Component;
