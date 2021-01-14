
import types from 'prop-types';
import React, { useState } from 'react';

import Image from '../symbols/Image';

import cn from 'classnames';
import styles from './default.module.scss';


function Gallery({ index, items, path, valueKey, className, isList }) {
  const [activeIndex, setActiveIndex] = useState(index);

  function hasCountItems(items) {
    return items.length > 1;
  }

  function handlePrevClick() {
    let prevIndex = activeIndex - 1;
    if (prevIndex < 0) {
      prevIndex = items.length - 1;
    }
    setActiveIndex(prevIndex);
  }

  function handleNextClick() {
    let nextIndex = activeIndex + 1;
    if (nextIndex > items.length - 1) {
      nextIndex = 0;
    }
    setActiveIndex(nextIndex);
  }

  function getFileName() {
    let fileSrc = items[activeIndex];
    if (fileSrc && fileSrc.constructor === Object) {
      fileSrc = fileSrc[valueKey];
    }
    return fileSrc ? `${path}/${fileSrc}` : '';
  }

  const src = getFileName();
  const hasCount = hasCountItems(items);
  const classNameGalleryWrapper = cn(className, styles['gallery']);
  const classNamePrevItem = cn(styles['gallery__icon'], 'fa fa-chevron-left');
  const classNameNextItem = cn(styles['gallery__icon'], 'fa fa-chevron-right');

  return (
    <div className={classNameGalleryWrapper}>
      {isList && hasCount && (
        <span className={styles['gallery__prev']} onClick={handlePrevClick}>
          <span className={classNamePrevItem} />
        </span>
      )}
      <div className={styles['gallery__content']}>
        <Image size="cover" src={src} />
        {isList && hasCount && (
          <div className={styles['gallery__count']}>
            <span className={styles['gallery__numbers']}>{activeIndex + 1} из {items.length}</span>
          </div>
        )}
      </div>
      {isList && hasCount && (
        <span className={styles['gallery__next']} onClick={handleNextClick}>
          <span className={classNameNextItem} />
        </span>
      )}
    </div>
  );
}

Gallery.propTypes = {
  className: types.string,
  valueKey: types.string,
  path: types.string,
  items: types.array,
  index: types.number,
  isList: types.bool,
};

Gallery.defaultProps = {
  className: '',
  valueKey: null,
  path: '',
  items: [],
  index: 0,
  isList: true,
};

export default Gallery;
