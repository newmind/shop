
import { Image, Text } from "@ui.packages/kit";

import React from 'react';
import { getFormValues, change } from 'redux-form';
import { useSelector, useDispatch } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';

import { selectGallery } from '../../../ducks/slice';


function ImagesForm() {
  const dispatch = useDispatch();

  const gallery = useSelector(selectGallery);
  const formValues = useSelector(getFormValues('gallery'));

  function handleAddImage(newImage) {
    let images = [...formValues['gallery']];
    const index = images.findIndex((image) => image['uuid'] === newImage['uuid'])
    if (index > -1) {
      images = [
        ...images.slice(0, index),
        ...images.slice(index + 1),
      ];
    }
    else {
      images.push({
        ...newImage,
        new: true,
      });
    }
    dispatch(change('gallery', 'gallery', images));
  }

  return (
    <div className={styles['wrapper']}>
      {gallery.map((img) => (
        <div className={styles['section']} key={img['uuid']} onClick={() => handleAddImage(img)}>
          <div className={cn(styles['image'], {
            [styles['image--selected']]: formValues['gallery'].some((image) => image['uuid'] === img['uuid'])
          })}>
            <Image src={`${process.env['REACT_APP_API_HOST']}/gallery/${img['uuid']}?size=small`} />
          </div>
          <div className={styles['name']}>
            <Text type={Text.TYPE_COMMENT}>{ img['name'] }</Text>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImagesForm;
