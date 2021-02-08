
import numeral from '@packages/numeral';

import { Mode } from '@ui.packages/types';
import { Confirm, openDialog, closeDialog } from "@ui.packages/dialog";
import { nounDeclension } from '@ui.packages/utils';
import { Column, Table } from "@ui.packages/table";
import { Actions, Gallery, Header } from "@ui.packages/kit";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import styles from "./default.module.scss";

import { selectInProcess, selectMeta, selectItems } from '../../ducks/slice';
import { copyProductById, removeProductById } from '../../ducks/commands';

function List() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const meta = useSelector(selectMeta);
  const items = useSelector(selectItems);
  const inProcess = useSelector(selectInProcess);

  const [productId, setProductId] = useState(null);


  function handleEdit(uuid) {
    navigate('/products/' + uuid);
  }

  function handleCancelRemove() {
    setProductId(null);
    dispatch(closeDialog('remove-confirm'));
  }

  function handleRemoveProduct(uuid) {
    setProductId(uuid);
    dispatch(openDialog('remove-confirm'));
  }

  async function handleConfirmRemove() {
    await dispatch(removeProductById([productId]));

    setProductId(null);
    dispatch(closeDialog('remove-confirm'));
  }

  function handleCancelCopy() {
    setProductId(null);
    dispatch(closeDialog('copy-confirm'));
  }

  function handleCopyProduct(uuid) {
    setProductId(uuid);
    dispatch(openDialog('copy-confirm'));
  }

  async function handleConfirmCopy() {
    await dispatch(copyProductById([ productId ]));

    setProductId(null);
    dispatch(closeDialog('copy-confirm'));
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
          {({ uuid, fiscal, name, brand, description, price, currency }) => {
            return (
              <div className={styles['description']}>
                {uuid && <div className={styles['description__item']}><b className={styles['description__label']}>{ uuid }</b></div>}
                {fiscal && <div className={styles['description__item']}><b className={styles['description__label']}>{ fiscal }</b></div>}
                {brand && <div className={styles['description__item']}><b className={styles['description__label']}>Бренд:</b> { brand }</div>}
                {name && <div className={styles['description__item']}><b className={styles['description__label']}>Название:</b> { name }</div>}
                {price && <div className={styles['description__item']}><b className={styles['description__label']}>Цена:</b> { numeral(price).format() } { currency }</div>}
                {description && <div className={styles['description__item']}><b className={styles['description__label']}>Описание:</b> { description }</div>}
              </div>
            )
          }}
        </Column>
        <Column
          title="Основные"
          align="left"
        >
          {({ types, categories, promotions }) => {
            return (
              <div className={styles['description']}>
                { !! types.length && <div className={styles['description__item']}><b className={styles['description__label']}>Тип:</b> { types.map((type, index) => <span key={index} className={styles['item']}>{ type['value'] }</span>) }</div>}
                { !! categories.length && <div className={styles['description__item']}><b className={styles['description__label']}>Категория:</b> { categories.map((category, index) => <span key={index} className={styles['item']}>{ category['value'] }</span>) }</div>}
                { !! promotions.length && <div className={styles['description__item']}><b className={styles['description__label']}>Скидки:</b> { promotions.map((promo, index) => <span key={index} className={styles['item']}>{ promo['name'] } ({promo['percent']} %)</span>) }</div>}
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
          width="70"
        >
          {({ uuid }) => (
            <Actions
              disabled={inProcess}
              onCopy={() => handleCopyProduct(uuid)}
              onEdit={() => handleEdit(uuid)}
              onDelete={() => handleRemoveProduct(uuid)}
            />
          )}
        </Column>
      </Table>

      <Confirm
        disabled={inProcess}
        name="remove-confirm"
        message="Вы уверены, что хотите удалить товар?"
        onConfirm={() => handleConfirmRemove()}
        onCancel={() => handleCancelRemove()}
      />

      <Confirm
        disabled={inProcess}
        mode={Mode.SUCCESS}
        name="copy-confirm"
        message="Копировать товар?"
        onConfirm={() => handleConfirmCopy()}
        onCancel={() => handleCancelCopy()}
      />
    </div>
  );
}

List.propTypes = {};

List.defaultProps = {};

export default List;
