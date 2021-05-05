
import { openDialog } from '@ui.packages/dialog';
import { Image, Draggable, Button, arrayMove } from '@ui.packages/kit';

import React from 'react';
import { useDispatch } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';


function AddImageForm({ input, disabled }) {
  const dispatch = useDispatch();


  function handleDelete(index) {
    input.onChange([
      ...input['value'].slice(0, index),
      ...input['value'].slice(index + 1),
    ]);
  }

  function handleOrderChange(from, to) {
    input.onChange(arrayMove(input['value'], from, to));
  }

  function handleAddImages() {
    dispatch(openDialog('add-images'));
  }

  return (
    <div className={styles['wrapper']}>
      {input['value'] && (
        <div className={styles['content']}>
          <Draggable type={Draggable.TYPE_GRID} onChange={handleOrderChange}>
            {input['value'].map((image, index) => {
              return (
                <div className={styles['section']} key={index}>
                  { ! disabled && <span className={cn(styles['remove-image'], 'fas fa-times')} onClick={() => handleDelete(index)} />}
                  <div className={cn(styles['image'], {
                    [styles['new']]: !! image['new'],
                  })}>
                    <Image src={`${process.env['REACT_APP_API_HOST']}/gallery/${image['uuid']}?size=small`} />
                  </div>
                </div>
              );
            })}
          </Draggable>
        </div>
      )}
      <div className={styles['controls']}>
        <Button
          form={Button.FORM_CREATE}
          disabled={disabled}
          onClick={() => handleAddImages()}
        >Добавить</Button>
      </div>
    </div>
  );
}

export default AddImageForm;
