
import {Image, Draggable, Button, arrayMove} from '@ui.packages/kit';

import types from 'prop-types';
import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function AddImageForm({ path, input, disabled, onDelete }) {

  function handleDelete(file) {
    if (file instanceof File) {
      const index = input['value'].indexOf(file);
      if (index > -1) {
        let files = [...(input['value'] || [])];
        files.splice(index, 1);
        input.onChange(files);
      }
    }
    else {
      onDelete(file);
    }
  }

  function handleAddImages() {
    const inputElement = document.createElement('input');

    inputElement.classList.add(styles['input']);
    inputElement.type = 'file';
    inputElement.multiple = true;
    inputElement.accept = '.jpg, .jpeg, .bmp, .png';

    inputElement.onchange = () => {
      let files = [...input['value'] || [], ...inputElement['files']];
      input.onChange(files);
      inputElement.remove();
    };

    inputElement.click();
  }

  function normalizeURI(src) {
    if (src && src.constructor === File) {
      return URL.createObjectURL(src);
    } else {
      return path + '/' + src + '?size=middle';
    }
  }

  function headerChange(from, to) {
    const files = [...input['value'] || []];
    input.onChange(arrayMove(files, from, to));
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <Draggable type={Draggable.TYPE_GRID} onChange={headerChange}>
          {(input['value'] || []).map((externalId, key) => {
            return (
              <div className={styles['section']} key={key}>
                <div className={cn(styles['image'], {
                  [styles['new']]: externalId.constructor === File,
                })}>
                  <span className={cn(styles['remove-image'], 'fas fa-times')} onClick={() => handleDelete(externalId)} />
                  <Image src={normalizeURI(externalId)} />
                </div>
              </div>
            );
          })}
        </Draggable>
      </div>
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

AddImageForm.propTypes = {
  path: types.string,
};

AddImageForm.defaultProps = {
  path: '',
};

export default AddImageForm;
