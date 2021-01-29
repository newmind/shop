
import numeral from '@packages/numeral';

import { nounDeclension } from '@ui.packages/utils';
import { Confirm } from "@ui.packages/dialog";
import { Column, Table } from "@ui.packages/table";
import { Actions, Gallery, Header } from "@ui.packages/kit";

import types from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from "./default.module.scss";


function List({ items, meta, openDialog, closeDialog, removeProductById }) {
  const navigate = useNavigate();
  const [productId, setProductId] = useState(null);

  function handleCancelRemove() {
    setProductId(null);
    closeDialog('remove-confirm');
  }

  function handleRemoveProduct(id) {
    setProductId(id);
    openDialog('remove-confirm');
  }

  async function handleConfirmRemove() {
    await removeProductById([ productId ]);

    setProductId(null);
    closeDialog('remove-confirm');
  }

  function handleEdit(uuid) {
    navigate('/products/' + uuid);
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={4}>Найдено { meta['total'] } {nounDeclension(meta['total'], ['товар', 'товара', 'товаров'])}</Header>
      </div>
      <Table columns={items}>
        <Column
          title="Фото"
          alias="gallery"
          width="140"
        >
          {(items) => <Gallery className={styles['image']} size="small" items={items} path={`${process.env['REACT_APP_API_HOST']}/gallery`} />}
        </Column>
        <Column
          title="Основные"
          align="left"
        >
          {({ uuid, fiscal, name, brand, description, amount, currency }) => {
            return (
              <div className={styles['description']}>
                {uuid && <div className={styles['description__item']}><b className={styles['description__label']}>{ uuid }</b></div>}
                {fiscal && <div className={styles['description__item']}><b className={styles['description__label']}>{ fiscal }</b></div>}
                {brand && <div className={styles['description__item']}><b className={styles['description__label']}>Бренд:</b> { brand }</div>}
                {name && <div className={styles['description__item']}><b className={styles['description__label']}>Название:</b> { name }</div>}
                {amount && <div className={styles['description__item']}><b className={styles['description__label']}>Цена:</b> { numeral(amount).format() } { currency }</div>}
                {description && <div className={styles['description__item']}><b className={styles['description__label']}>Описание:</b> { description }</div>}
              </div>
            )
          }}
        </Column>
        <Column
          title="Основные"
          align="left"
        >
          {({ types, categories }) => {
            return (
              <div className={styles['description']}>
                { !! types.length && <div className={styles['description__item']}><b className={styles['description__label']}>Тип:</b> { types.map((type, index) => <span key={index} className={styles['item']}>{ type['value'] }</span>) }</div>}
                { !! categories.length && <div className={styles['description__item']}><b className={styles['description__label']}>Категория:</b> { categories.map((category, index) => <span key={index} className={styles['item']}>{ category['value'] }</span>) }</div>}
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
                    {attr['unit'] && <span className={styles['attributes__unit']}>{ attr['unit'] }</span>}
                  </li>
                ))}
              </ul>
            );
          }}
        </Column>
        <Column
          align="right"
          width="50"
        >
          {({ uuid }) => (
            <Actions
              onEdit={() => handleEdit(uuid)}
              onDelete={() => handleRemoveProduct(uuid)}
            />
          )}
        </Column>
      </Table>

      <Confirm
        name="remove-confirm"
        message="Вы уверены, что хотите удалить товар?"
        onConfirm={() => handleConfirmRemove()}
        onCancel={() => handleCancelRemove()}
      />
    </div>
  );
}

List.propTypes = {
  items: types.array,
  meta: types.object,
};

List.defaultProps = {
  items: [],
  meta: {
    total: 0,
  }
};

export default List;
