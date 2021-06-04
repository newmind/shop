
import { selectFilter, selectInProcess } from '@modules/admin-products';

import { Mode } from '@ui.packages/types';
import { Row, Col, InputField, SelectField, Button } from '@ui.packages/kit';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';


export default function Filter({ handleSubmit }) {
  const { types, brands, categories } = useSelector(selectFilter);
  const inProcess = useSelector(selectInProcess);

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <Row>
        <Col>
          <InputField
            name="fiscal"
            placeholder="Фискальный номер"
            disabled={inProcess}
          />
        </Col>
        <Col>
          <InputField
            name="uuid"
            placeholder="Номер товара"
            disabled={inProcess}
          />
        </Col>
        <Col>
          <SelectField
            simple
            placeholder="Тип"
            name="typeId"
            options={types}
            disabled={inProcess}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <SelectField
            simple
            placeholder="Бренд"
            name="brandId"
            options={brands}
            disabled={inProcess}
          />
        </Col>
        <Col>
          <SelectField
            simple
            placeholder="Категория"
            name="categoryId"
            options={categories}
            disabled={inProcess}
          />
        </Col>
        <Col>
          <Button
            type={Button.TYPE_SUBMIT}
            mode={Mode.PRIMARY}
            disabled={inProcess}
          >Применить</Button>
        </Col>
      </Row>
    </form>
  );
};
