
import { SelectField, CheckBoxField, Row, Col } from '@ui.packages/kit';

import React from 'react';
import types from 'prop-types';

import Option from './Option';

import styles from './default.module.scss';


function Form({ handleSubmit, submit, types, categories, brands, colors, forms, materials, inProcess }) {
  function onSubmit() {
    setTimeout(() => submit('filter-showcase-ui'), 50);
  }

  return (
    <form onSubmit={handleSubmit} className={styles['wrapper']}>
      <div className={styles['fields']}>
        <div className={styles['line']}>
          <div className={styles['col']}>
            <SelectField
              placeholder="Тип"
              name="typeId"
              options={types}
              optionKey="id"
              optionValue="value"
              simple={true}
              OptionTemplate={Option}
              disabled={inProcess}
              onChange={onSubmit}
            />
          </div>
          <div className={styles['col']}>
            <SelectField
              placeholder="Категория"
              name="categoryId"
              options={categories}
              optionKey="id"
              optionValue="value"
              simple={true}
              OptionTemplate={Option}
              disabled={inProcess}
              onChange={onSubmit}
            />
          </div>
          <div className={styles['col']}>
            <SelectField
              placeholder="Цвет"
              name="colorId"
              optionKey="id"
              optionValue="value"
              options={colors}
              simple={true}
              OptionTemplate={Option}
              disabled={inProcess}
              onChange={onSubmit}
            />
          </div>
          <div className={styles['col']}>
            <SelectField
              placeholder="Материал"
              name="materialId"
              optionKey="id"
              optionValue="value"
              options={materials}
              simple={true}
              OptionTemplate={Option}
              disabled={inProcess}
              onChange={onSubmit}
            />
          </div>
        </div>
        <div className={styles['line']}>
          <div className={styles['col']}>
            <SelectField
              placeholder="Бренд"
              name="brand"
              optionKey="value"
              optionValue="value"
              options={brands}
              simple={true}
              OptionTemplate={Option}
              disabled={inProcess}
              onChange={onSubmit}
            />
          </div>
          <div className={styles['col']}>
            <SelectField
              placeholder="Форма"
              name="formId"
              optionKey="id"
              optionValue="value"
              options={forms}
              simple={true}
              OptionTemplate={Option}
              disabled={inProcess}
              onChange={onSubmit}
            />
          </div>
          <div className={styles['col']}>
            <Row>
              <Col>
                {/*<RangeField*/}
                {/*  min={0}*/}
                {/*  max={30000}*/}
                {/*  step={500}*/}
                {/*  name="amount"*/}
                {/*  onChange={onSubmit}*/}
                {/*/>*/}
              </Col>
            </Row>
          </div>
          <div className={styles['col']}>
            <div className={styles['additional']}>
              <div className={styles['additional__col']}>
                <CheckBoxField label="скидка" name="isHit" onChange={onSubmit} />
              </div>
              <div className={styles['additional__col']}>
                <CheckBoxField label="новинки" name="isSale" onChange={onSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

Form.propTypes = {
  types: types.array,
  categories: types.array,
  brands: types.array,
  colors: types.array,
  forms: types.array,
  materials: types.array,
  isValid: types.bool,
  inProcess: types.bool,
};

Form.defaultProps = {
  types: [],
  categories: [],
  brands: [],
  colors: [],
  forms: [],
  materials: [],
  isValid: false,
  inProcess: false,
};

export default Form;
