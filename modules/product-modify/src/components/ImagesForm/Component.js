
import { Mode } from '@ui.packages/types';
import { Button } from '@ui.packages/kit';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Gallery from './Gallery';

import styles from './default.module.scss';

import { getGallery } from '../../ducks/commands';


function ImagesForm({ handleSubmit, valid, pristine }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGallery());
    return () => {

    };
  }, []);

  return (
    <div className={styles['wrapper']}>
      <form onSubmit={handleSubmit}>
        <div className={styles['content']}>
          <Gallery />
        </div>
        <div className={styles['controls']}>
          <Button
            type="submit"
            mode={Mode.SUCCESS}
            disabled={ ! valid || pristine}
          >Добавить</Button>
        </div>
      </form>
    </div>
  );
}

export default ImagesForm;
