
import types from 'prop-types';
import React, { PureComponent } from 'react';

import Image from '../symbols/Image';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    className: types.string,
    valueKey: types.string,
    path: types.string,
    items: types.array,
    index: types.number,
    isList: types.bool,
  };

  static defaultProps = {
    className: '',
    valueKey: null,
    path: '',
    items: [],
    index: 0,
    isList: true,
  };

  static hasCountItems = (items) => {
    return items.length > 1;
  };

  constructor(props) {
    super(props);

    const { index } = props;

    this.state = {
      activeIndex: index,
    };
  }

  _handlePrevClick() {
    let { activeIndex } = this.state;
    const { items } = this.props;
    activeIndex--;
    if (activeIndex < 0) {
      activeIndex = items.length - 1;
    }
    this.setState({ activeIndex });
  }

  _handleNextClick() {
    let { activeIndex } = this.state;
    const { items } = this.props;
    activeIndex++;
    if (activeIndex > items.length - 1) {
      activeIndex = 0;
    }
    this.setState({ activeIndex });
  }

  _getFileName() {
    const { activeIndex } = this.state;
    const { path, valueKey, items } = this.props;
    let fileSrc = items[activeIndex];
    if (fileSrc && fileSrc.constructor === Object) {
      fileSrc = fileSrc[valueKey];
    }
    return fileSrc ? `${path}/${fileSrc}` : '';
  }

  render() {
    const { activeIndex } = this.state;
    const { className, items, isList } = this.props;
    const hasCount = Component.hasCountItems(items);
    const classNameGalleryWrapper = cn(className, styles['gallery']);
    const classNamePrevItem = cn(styles['gallery__icon'], 'fa fa-chevron-left');
    const classNameNextItem = cn(styles['gallery__icon'], 'fa fa-chevron-right');
    const src = this._getFileName();
    return (
      <div className={classNameGalleryWrapper}>
        {isList && hasCount && (
          <span className={styles['gallery__prev']} onClick={this._handlePrevClick.bind(this)}>
            <span className={classNamePrevItem} />
          </span>
        )}
        <div className={styles['gallery__content']}>
          <Image src={src} />
          {isList && hasCount && (
            <div className={styles['gallery__count']}>
              <span className={styles['gallery__numbers']}>{activeIndex + 1} из {items.length}</span>
            </div>
          )}
        </div>
        {isList && hasCount && (
          <span className={styles['gallery__next']} onClick={this._handleNextClick.bind(this)}>
            <span className={classNameNextItem} />
          </span>
        )}
      </div>
    );
  }
}

export default Component;
