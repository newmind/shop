
import {
  selectBrands,
  selectCategories,
  selectCurrencies,
  selectInProcess,
  selectTypes,
} from "@modules/admin-product-modify";

import {CheckBoxField, Col, Header, InputField, Row, SelectField, TextareaField} from "@ui.packages/kit";

import React from 'react';
import { useSelector } from "react-redux";

import styles from './default.module.scss';


function Common() {
  const types = useSelector(selectTypes);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const currencies = useSelector(selectCurrencies);
  const inProcess = useSelector(selectInProcess);

  return (
    <div className={styles['block']}>
      <div className={styles['header']}>
        <Header level={3}>Основные</Header>
      </div>
      <div className={styles['content']}>
        <Row>
          <Col>
            <CheckBoxField name="isView" label="отображать в каталоге" />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField name="uuid" label="Номер товара (генерируется автоматически)" disabled />
          </Col>
          <Col>
            <InputField name="fiscal" label="Фискальный номер" disabled={inProcess} />
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectField
              require
              simple
              name="type"
              label="Тип"
              options={types}
              optionKey="id"
              optionValue="value"
              disabled={inProcess}
            />
          </Col>
          <Col>
            <SelectField
              require
              simple
              name="category"
              label="Категория"
              options={categories}
              optionKey="id"
              optionValue="value"
              disabled={inProcess}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectField
              require
              simple
              name="brand"
              label="Бренд"
              options={brands}
              optionKey="id"
              optionValue="value"
              disabled={inProcess}
            />
          </Col>
          <Col>
            <InputField require name="name" label="Назвние" disabled={inProcess} />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField require name="price" label="Цена" disabled={inProcess} />
          </Col>
          <Col>
            <SelectField
              require
              simple
              name="currencyCode"
              label="Валюта"
              options={currencies}
              optionKey="code"
              optionValue="value"
              disabled={inProcess}
            />
          </Col>
          <Col />
          <Col />
        </Row>
        <Row>
          <Col>
            <TextareaField
              require
              name="description"
              label="Описание"
              disabled={inProcess}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Common;
