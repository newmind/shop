
import { selectInProcess, selectShops } from '@modules/admin-product-modify';

import { InputField, SelectField, Button, Header } from '@ui.packages/kit';

import React from 'react';
import { FieldArray } from 'redux-form';
import { useSelector } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';


function ShopsField({ fields }) {
  const shops = useSelector(selectShops);

  function handleAdd() {
    fields.push({ shopUuid: null, number: 0 });
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
            <div className={styles['shop']}>
              <SelectField
                label={'Магазин'}
                options={shops}
                name={`${characteristic}.shopUuid`}
                optionKey={'uuid'}
                optionValue={'name'}
              />
            </div>
            <div className={styles['number']}>
              <InputField label={'Количество'} name={`${characteristic}.number`}/>
            </div>
            <span className={styles['remove']}>
              <span className={classNameRemoveAttr} onClick={() => handleRemove(index)}/>
            </span>
          </div>
        ))}
      </div>
      <div className={styles['controls']}>
        <Button
          form={Button.FORM_CREATE}
          mode={Button.MODE_PRIMARY}
          size={Button.SIZE_SMALL}
          onClick={() => handleAdd()}
        >Привязать к магазину</Button>
      </div>
    </div>
  );
}

function Characteristics() {
  const inProcess = useSelector(selectInProcess);

  return (
    <div className={styles['block']}>
      <div className={styles['header']}>
        <Header level={3}>Магазин</Header>
      </div>
      <div className={styles['content']}>
        <FieldArray name="shops" component={ShopsField} disabled={inProcess} />
      </div>
    </div>
  );
}

export default Characteristics;
