
import { Confirm } from "@ui.packages/dialog";
import { Gallery, Table, Button, Row, Col } from '@ui.packages/ui';

import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    products: types.array,
  };

  static defaultProps = {
    products: [],
  };

  state = {
    productId: null,
    product: null,
  };

  _handleAddProduct() {
    const { replaceURI } = this.props;
    replaceURI('/products/create');
  }

  _handleCancelRemove() {
    const { closeDialog } = this.props;
    this.setState({ productId: null }, () => closeDialog('remove-confirm'));
  }

  _handleRemoveProduct(id) {
    const { openDialog } = this.props;
    this.setState({ productId: id }, () => openDialog('remove-confirm'));
  }

  async _handleConfirmRemove() {
    const { productId } = this.state;
    const { removeProductById, closeDialog } =  this.props;
    await removeProductById(productId);
    this.setState({ productId: null }, () => closeDialog('remove-confirm'));
  }

  render() {
    const { products } = this.props;
    return (
      <div className="page">
        <Row>
          <Col>
            <Button mode="primary" onClick={this._handleAddProduct.bind(this)}>Добавить товар на склад</Button>
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
                  template: (items) => <Gallery className={styles['image']} valueKey={'id'} items={items} path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
                },
                {
                  title: 'Основное',
                  template: ({ name, brand, description }) => (
                    <div className={styles['description']}>
                      {brand && <div className={styles['description__item']}><b className={styles['description__label']}>Бренд:</b> { brand }</div>}
                      {name && <div className={styles['description__item']}><b className={styles['description__label']}>Название:</b> { name }</div>}
                      {description && <div className={styles['description__item']}><b className={styles['description__label']}>Описание:</b> { description }</div>}
                    </div>
                  ),
                },
                {
                  title: 'Описание',
                  template: ({ color, form, material }) => {
                    return (
                      <div className={styles['description']}>
                        {color && <div className={styles['description__item']}><b className={styles['description__label']}>Цвет:</b> { color }</div>}
                        {material && <div className={styles['description__item']}><b className={styles['description__label']}>Материал:</b> { material }</div>}
                        {form && <div className={styles['description__item']}><b className={styles['description__label']}>Форма:</b> { form }</div>}
                      </div>
                    );
                  }
                },
                {
                  alias: 'attributes',
                  title: 'Аттрибуты',
                  template: (attrs) => {
                    return (
                      <ul className={styles['attributes']}>
                        { ! attrs.length && <li className={styles['attributes__item']}>Нет данных</li>}
                        {attrs.map((attr, index) => (
                          <li key={index} className={styles['attributes__item']}>
                            <span className={styles['attributes__name']}>{ attr['name'] }:</span>
                            <span className={styles['attributes__value']}>{ attr['value'] }</span>
                            {attr['unit'] && <span className={styles['attributes__unit']}>{ attr['unit']['value'] }</span>}
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
        <Confirm
          name="remove-confirm"
          message="Вы уверены, что хотите удалить товар со склада?"
          onConfirm={this._handleConfirmRemove.bind(this)}
          onCancel={this._handleCancelRemove.bind(this)}
        />
      </div>
    );
  }
}

export default Component;
