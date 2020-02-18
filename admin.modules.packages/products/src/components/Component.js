
import { Confirm } from "@ui.packages/dialog";
import { Table, Column } from "@ui.packages/table";
import { Gallery, Button, Row, Col } from '@ui.packages/ui';

import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    items: types.array,
  };

  static defaultProps = {
    items: [],
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
    await removeProductById([ productId ]);

    this.setState({ productId: null }, () => closeDialog('remove-confirm'));
  }

  render() {
    const { items } = this.props;

    return (
      <div className="page">
        <Row>
          <Col>
            <Button mode="primary" onClick={this._handleAddProduct.bind(this)}>Добавить товар на склад</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table columns={items}>
              <Column
                title="ID"
                alias="id"
                width="30"
                align="left"
              />
              <Column
                title="Фото"
                alias="gallery"
                width="140"
              >
                {(items) => <Gallery className={styles['image']} valueKey={'id'} items={items} path={`${process.env['REACT_APP_API_HOST']}/gallery`} />}
              </Column>
              <Column
                title="Основное"
                align="left"
              >
                {({ uuid, name, brand, description, amount, currency }) => {
                  return (
                    <div className={styles['description']}>
                      {uuid && <div className={styles['description__item']}><b className={styles['description__label']}># </b>{ uuid }</div>}
                      {brand && <div className={styles['description__item']}><b className={styles['description__label']}>Бренд:</b> { brand }</div>}
                      {name && <div className={styles['description__item']}><b className={styles['description__label']}>Название:</b> { name }</div>}
                      {name && <div className={styles['description__item']}><b className={styles['description__label']}>Цена:</b> { amount } { currency['value'] }</div>}
                      {description && <div className={styles['description__item']}><b className={styles['description__label']}>Описание:</b> { description }</div>}
                    </div>
                  )
                }}
              </Column>
              <Column
                title="Описание"
                align="left"
                width="200"
              >
                {({ type, category, color, form, material }) => {
                  return (
                    <div className={styles['description']}>
                      {type && <div className={styles['description__item']}><b className={styles['description__label']}>Тип:</b> { type['value'] }</div>}
                      {category && <div className={styles['description__item']}><b className={styles['description__label']}>Категория:</b> { category['value'] }</div>}
                      {color && <div className={styles['description__item']}><b className={styles['description__label']}>Цвет:</b> { color['value'] }</div>}
                      {form && <div className={styles['description__item']}><b className={styles['description__label']}>Форма:</b> { form['value'] }</div>}
                      {material && <div className={styles['description__item']}><b className={styles['description__label']}>Материал:</b> { material['value'] }</div>}
                    </div>
                  );
                }}
              </Column>
              <Column
                title="Аттрибуты"
                alias="attributes"
                align="left"
                width="200"
              >
                {(attrs) => {
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
                }}
              </Column>
              <Column
                align="right"
                width="70"
              >
                {({ id, status }) => {
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
                }}
              </Column>
            </Table>
          </Col>
        </Row>
        <Confirm
          name="remove-confirm"
          message="Вы уверены, что хотите удалить товар?"
          onConfirm={this._handleConfirmRemove.bind(this)}
          onCancel={this._handleCancelRemove.bind(this)}
        />
      </div>
    );
  }
}

export default Component;
