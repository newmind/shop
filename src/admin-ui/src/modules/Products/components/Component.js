
import types from 'prop-types';
import React, { PureComponent } from 'react';

import numeral from '@packages/numeral';

import { Link } from 'react-router-dom';
import { Gallery, Table, Button, Row, Col } from '@packages/ui';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    products: types.array,
  };

  static defaultProps = {
    products: [],
  };

  _handleAddProduct() {
    const { replaceURI } = this.props;
    replaceURI('/products/create');
  }

  _handleRemoveProduct(id, status) {
    const { removeProductById } = this.props;
    removeProductById(id, status);
  }

  render() {
    const { products } = this.props;
    return (
      <div className="page">
        <Row>
          <Col>
            <Button mode="primary" onClick={this._handleAddProduct.bind(this)}>Добавить товар</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table
              items={products}
              columns={[
                {
                  title: 'ID',
                  alias: 'id',
                  attrs: {
                    width: '60px'
                  }
                },
                {
                  title: 'Изображение',
                  alias: 'gallery',
                  attrs: {
                    width: '140px',
                    align: 'center',
                  },
                  template: (items) => <Gallery className={styles['image']} valueKey={'file'} items={items} path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
                },
                {
                  alias: 'name',
                  title: 'Наименование',
                },
                {
                  alias: 'brand',
                  title: 'Бранд',
                },
                {
                  alias: 'description',
                  title: 'Описание',
                },
                {
                  alias: 'attributes',
                  title: 'Аттрибуты',
                  template: (attrs) => {
                    return (
                      <ul className={styles['attributes']}>
                        {attrs.map((attr, index) => (
                          <li key={index} className={styles['attributes__item']}>
                            <span className={styles['attributes__name']}>{ attr['name'] }:</span>
                            <span className={styles['attributes__value']}>{ attr['value'] }</span>
                          </li>
                        ))}
                      </ul>
                    );
                  },
                },
                {
                  attrs: {
                    width: '70px',
                    vAlign: 'middle',
                  },
                  template: ({ id, status }) => {
                    const toArchiveClassName = cn(styles['actions__item'], {
                      [styles['actions__item--trash']]: status === 1,
                      [styles['actions__item--return']]: status === 0,
                      'far fa-trash-alt': status === 1,
                      'fas fa-check': status === 0,
                    });
                    const newStatus = status === 1 ? 0 : 1;
                    return (
                      <div className={styles['actions']}>
                        <Link className={cn(styles['actions__item'], styles['actions__item--edit'], "fas fa-pencil-alt")} to={`/products/${id}`} />
                        <span className={toArchiveClassName} onClick={this._handleRemoveProduct.bind(this, id, newStatus)} />
                      </div>
                    );
                  }
                }
              ]}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Component;
