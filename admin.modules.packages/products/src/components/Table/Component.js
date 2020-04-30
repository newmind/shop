
import { Confirm } from "@ui.packages/dialog";
import { Column, Table } from "@ui.packages/table";
import { Actions, Gallery } from "@ui.packages/ui";

import types from 'prop-types';
import React, { PureComponent } from 'react';

import styles from "./default.module.scss";


class Component extends PureComponent {
  static propTypes = {
    items: types.array,
    meta: types.object,
  };

  static defaultProps = {
    items: [],
    meta: {
      total: 0,
    }
  };

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

  _handleEdit(uuid) {
    const { replaceURI } = this.props;

    replaceURI('/products/' + uuid);
  }

  render() {
    const { items, meta } = this.props;

    return (
      <div className={styles['wrapper']}>
        <div className={styles['header']}>
          <p>Найдено { meta['total'] } продуктов</p>
        </div>
        <Table columns={items}>
          <Column
            title="Фото"
            alias="gallery"
            width="140"
          >
            {(items) => <Gallery className={styles['image']} valueKey={'externalId'} items={items} path={`${process.env['REACT_APP_API_HOST']}/gallery`} />}
          </Column>
          <Column
            title="Основное"
            align="left"
          >
            {({ uuid, name, brand, description, amount, currency }) => {
              return (
                <div className={styles['description']}>
                  {uuid && <div className={styles['description__item']}><b className={styles['description__label']}>{ uuid }</b></div>}
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
            {({ uuid }) => (
              <Actions
                onEdit={this._handleEdit.bind(this, uuid)}
                onDelete={this._handleRemoveProduct.bind(this, uuid, 0)}
              />
            )}
          </Column>
        </Table>
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
