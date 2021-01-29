
import { Mode } from '@ui.packages/types';
import { Row, Col, InputField, SelectField, Button } from '@ui.packages/kit';

import React from 'react';
import types from 'prop-types';
import { useSelector } from 'react-redux';
import { getFormValues } from 'redux-form';

import cn from 'classnames';
import styles from './default.module.scss';

import { selectAttributes } from '../../ducks/slice';


function AttributeField({ field, data, disabled, onRemove }) {
  const attributes = useSelector(selectAttributes);
  const attributeId = data ? data['id'] : null;
  const attribute = attributeId ? attributes.find((item) => item['id'] === attributeId) : null;
  const unit = attribute ? attribute['unit'] : null;

  function handleRemove() {
    onRemove && onRemove();
  }

  const classNameRemoveAttr = cn(styles['attr__remove'], 'far fa-trash-alt');

  return (
    <div className={styles['attr']}>
      <div className={styles['attr__title']}>
        <SelectField
          require
          label="Назавание"
          name={`${field}.id`}
          disabled={disabled}
          options={attributes}
          optionKey="id"
          optionValue="value"
        />
      </div>
      <div className={styles['attr__value']}>
        <InputField require label="Значение" name={`${field}.value`} disabled={disabled} />
      </div>
      <div className={styles['attr__units']}>
        <span className={styles['unit']}>{ unit ? unit['value'] : '---' }</span>
      </div>
      <div className={styles['attr__controls']}>
        <span className={classNameRemoveAttr} onClick={() => handleRemove()} />
      </div>
    </div>
  );
}

AttributeField.propTypes = {
  field: types.string,
  onRemove: types.func,
};

AttributeField.defaultProps = {
  field: '',
};


function Attributes({ fields, disabled }) {
  const data = useSelector(getFormValues('modify-product'));

  function handleAddAttr() {
    fields.push({});
  }

  function handleRemoveAttr(index) {
    fields.remove(index)
  }

  return (
    <div className={styles['wrapper']}>
      { !! fields.length && (
        <Row>
          <div className={styles['attrs']}>
            {fields.map((field, index) => (
              <AttributeField
                key={index}
                field={field}
                data={data['attributes'][index]}
                disabled={disabled}
                onRemove={() => handleRemoveAttr(index)}
              />
            ))}
          </div>
        </Row>
      )}
      <Row>
        <Col className={styles['align-right']}>
          <Button
            mode={Mode.PRIMARY}
            form={Button.FORM_CONTEXT}
            disabled={disabled}
            onClick={() => handleAddAttr()}
          >Добавить</Button>
        </Col>
      </Row>
    </div>
  );
}

Attributes.propTypes = {
  path: types.string,
  units: types.array,
};

Attributes.defaultProps = {
  path: '',
  units: [],
};

export default Attributes;
