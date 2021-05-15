
import { Row, Col, InputField, SelectField, Button, Draggable, CheckBoxField } from '@ui.packages/kit';

import React from 'react';
import types from 'prop-types';
import { useSelector } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';

import { selectAttributes } from '../../../../ducks/slice';


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
      <div className={styles['checkbox']}>
        <CheckBoxField name={`${field}.use`} />
      </div>
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

function AttributeList({ fields, disabled }) {

  function handleRemoveAttr(index) {
    fields.remove(index)
  }

  function handleChangeOrder(from, to) {
    if (from !== null && to !== null) {
      fields.move(from, to);
    }
  }

  if ( ! fields.length) {
    return null;
  }

  return (
    <Row>
      <div className={styles['attrs']}>
        <Draggable onChange={(from, to) => handleChangeOrder(from, to)}>
          {fields.map((field, index) => {
            return (
              <AttributeField
                key={index}
                field={field}
                data={fields.get(index)}
                disabled={disabled}
                onRemove={() => handleRemoveAttr(index)}
              />
            )
          })}
        </Draggable>
      </div>
    </Row>
  );
}

function AttributesField({ fields, disabled }) {

  function handleAddAttr() {
    fields.push({});
  }

  return (
    <div className={styles['wrapper']}>
      <AttributeList disabled={disabled} fields={fields} />
      <Row>
        <Col className={styles['align-right']}>
          <Button
            form={Button.FORM_CREATE}
            disabled={disabled}
            onClick={() => handleAddAttr()}
          >Добавить аттрибут</Button>
        </Col>
      </Row>
    </div>
  );
}

AttributesField.propTypes = {
  path: types.string,
  units: types.array,
};

AttributesField.defaultProps = {
  path: '',
  units: [],
};

export default AttributesField;
