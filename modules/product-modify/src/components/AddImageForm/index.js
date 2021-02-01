
import { Image } from '@ui.packages/kit';

import types from 'prop-types';
import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function AddImageForm({ path, input, onDelete }) {

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

  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['section']}>
          <span className={styles['add-image']} onClick={() => handleAddImages()}>
            <span className={cn('fas fa-plus', styles['add-image__icon'])}/>
          </span>
        </div>
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
