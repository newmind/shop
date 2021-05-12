
import numeral from '@packages/numeral';

import { Mode } from '@ui.packages/types';
import { Column, Table } from "@ui.packages/table";
import { nounDeclension } from '@ui.packages/utils';
import { Actions, Gallery, Header, CheckBox, Text } from "@ui.packages/kit";
import { Confirm, openDialog, closeDialog } from "@ui.packages/dialog";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Types from './Types';
import Categories from './Categories';

import styles from "./default.module.scss";

import { selectInProcess, selectMeta, selectItems } from '../../ducks/slice';
import { copyProductById, removeProductById, updateStatusProductById } from '../../ducks/commands';


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

  function handleUpdate(uuid, isView) {
    dispatch(updateStatusProductById(uuid, isView));
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
          width={140}
        >
          {(items) => <Gallery className={styles['image']} valueKey="uuid" size="small"  items={items} path={`${process.env['REACT_APP_API_HOST']}/gallery`} />}
        </Column>
        <Column
          title="Основные"
          align="left"
          width={250}
        >
          {({ uuid, fiscal, name, brand, price, prevPrice, currency }) => {
            return (
              <div className={styles['common']}>
                <div className={styles['number']}>
                  <Text type={Text.TYPE_BODY}>{ uuid }</Text>
                  {fiscal && (
                    <Text type={Text.TYPE_COMMENT}>&nbsp;[{ fiscal }]</Text>
                  )}
                </div>
                <div className={styles['information']}>
                  {name && (
                    <Header level={4}>{ name }</Header>
                  )}
                  {brand && (
                    <Text>{ brand['name'] }</Text>
                  )}
                </div>

                {prevPrice && (
                  <div className={styles['price']}>
                    <div className={styles['description__item']}>
                      <Text type={Text.TYPE_AMOUNT}>{ numeral(prevPrice).format() } { currency['name'] }</Text>
                    </div>
                    <div className={styles['description__item']}>
                      <Text className={styles['prev-price']} type={Text.TYPE_BODY}><i className="fas fa-arrow-down" /> { numeral(prevPrice - price).format() } { currency['name'] }</Text>
                    </div>
                    <div className={styles['description__item']}>
                      <Text type={Text.TYPE_COMMENT}>= { numeral(price).format() } { currency['name'] }</Text>
                    </div>
                  </div>
                )}
                { ! prevPrice && (
                  <div className={styles['price']}>
                    <div className={styles['description__item']}>
                      <Text type={Text.TYPE_AMOUNT}>{ numeral(price).format() } { currency['name'] }</Text>
                    </div>
                  </div>
                )}
              </div>
            )
          }}
        </Column>
        <Column
          title="Описание"
          align="left"
        >
          {({ types, categories, promotions }) => {
            return (
              <div className={styles['description']}>
                { !! types.length && (
                  <Types items={types} />
                )}
                { !! categories.length && (
                  <Categories items={categories} />
                )}
                { !! promotions.length && <div className={styles['description__item']}><b className={styles['description__label']}>Скидки:</b> { promotions.map((promo, index) => <span key={index} className={styles['item']}>{ promo['name'] } ({promo['percent']} %)</span>) }</div>}
              </div>
            );
          }}
        </Column>
        <Column
          title="Видим"
          width="50"
        >
          {({ uuid, isView }) => <CheckBox value={isView} disabled={inProcess} onChange={(value) => handleUpdate(uuid, value)} />}
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
