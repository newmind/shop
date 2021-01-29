
import { Mode } from '@ui.packages/types';
import { Row, Col, InputField, SelectField, Button } from '@ui.packages/kit';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';

import { selectFilter, selectInProcess } from '../../ducks/slice';


export default function Filter({ handleSubmit, submit }) {
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
            placeholder="Бренд"
            name="brand"
            options={brands}
            optionKey="value"
            disabled={inProcess}
          />
        </Col>
        <Col>
          <SelectField
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
            onClick={submit}
            disabled={inProcess}
          >Применить</Button>
        </Col>
      </Row>
    </form>
  );
};
