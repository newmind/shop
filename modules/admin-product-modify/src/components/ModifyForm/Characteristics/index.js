
import { selectInProcess } from '@modules/admin-product-modify';

import { InputField, Button, Header } from '@ui.packages/kit';

import React from 'react';
import { FieldArray } from 'redux-form';
import { useSelector } from 'react-redux';

import AttributesField from "./Attributes";

import cn from 'classnames';
import styles from './default.module.scss';


function CharacteristicsField({ fields }) {
  function handleAdd() {
    fields.push({ attributes: [], });
  }

  function handleRemove(index) {
    fields.remove(index);
  }

  const classNameRemoveAttr = cn(styles['icon'], 'far fa-trash-alt');

  return (
    <div className={styles['wrapper']}>
      <div className={styles['characteristics']}>
        {fields.map((characteristic, index) => (
          <div key={index} className={styles['characteristic']}>
            <div className={styles['name']}>
              <InputField label={'Название характеристики'} name={`${characteristic}.name`}/>
              <span className={styles['remove']}>
                <span className={classNameRemoveAttr} onClick={() => handleRemove(index)}/>
              </span>
            </div>
            <div className={styles['attributes']}>
              <FieldArray name={`${characteristic}.attributes`} component={AttributesField} />
            </div>
          </div>
        ))}
      </div>
      <div className={styles['controls']}>
        <Button
          form={Button.FORM_CREATE}
          mode={Button.MODE_PRIMARY}
          size={Button.SIZE_SMALL}
          onClick={() => handleAdd()}
        >Дбавить характеристику</Button>
      </div>
    </div>
  );
}

function Characteristics() {
  const inProcess = useSelector(selectInProcess);

  return (
    <div className={styles['block']}>
      <div className={styles['header']}>
        <Header level={3}>Характеристика</Header>
      </div>
      <div className={styles['content']}>
        <FieldArray name="characteristics" component={CharacteristicsField} disabled={inProcess} />
      </div>
    </div>
  );
}

export default Characteristics;
