
import { Row, Col, InputField, Button, Draggable, CheckBoxField } from '@ui.packages/kit';

import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


function OptionField({ field, disabled, onRemove }) {

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
        <InputField
          require
          label="Назавание"
          name={`${field}.name`}
          disabled={disabled}
        />
      </div>
      <div className={styles['attr__value']}>
        <InputField
          label="Артикул"
          name={`${field}.vendor`}
          disabled={disabled}
        />
      </div>
      <div className={styles['attr__controls']}>
        <span className={classNameRemoveAttr} onClick={() => handleRemove()} />
      </div>
    </div>
  );
}

OptionField.propTypes = {
  field: types.string,
  onRemove: types.func,
};

OptionField.defaultProps = {
  field: '',
};

function OptionsList({ fields, disabled }) {

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
              <OptionField
                key={index}
                field={field}
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

function OptionsField({ fields, disabled }) {

  function handleAddAttr() {
    fields.push({});
  }

  return (
    <div className={styles['wrapper']}>
      <OptionsList disabled={disabled} fields={fields} />
      <Row>
        <Col className={styles['align-right']}>
          <Button
            form={Button.FORM_CREATE}
            mode={Button.MODE_PRIMARY}
            size={Button.SIZE_SMALL}
            disabled={disabled}
            onClick={() => handleAddAttr()}
          >Добавить комплектацию</Button>
        </Col>
      </Row>
    </div>
  );
}

OptionsField.propTypes = {
  fields: types.object,
  disabled: types.bool,
};

OptionsField.defaultProps = {
  fields: null,
  disabled: false,
};

export default OptionsField;
