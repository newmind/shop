
import types from 'prop-types';
import React, { PureComponent } from 'react';

import Spinner from '../Spinner';

import cn from 'classnames';
import styles from './default.module.scss';

const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


class Component extends PureComponent {
  static propTypes = {
    className: types.string,
    src: types.string,
    mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
  };

  static defaultProps = {
    className: '',
    src: '',
    mode: 'default',
  };

  static getSize(element) {
    const rect = element.getBoundingClientRect();
    return {
      width: rect['width'],
      height: rect['height'],
    };
  }

  timeOutInstance = null;

  wrapperRef = React.createRef();
  imageRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isError: false,
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { current: imageElement } = this.imageRef;
    const { src } = this.props;
    const state = { isError: false };

    if (src !== nextProps['src']) {

      imageElement.style['width'] = 'auto';
      imageElement.style['height'] = 'auto';

      state['isLoading'] = true;
    }

    this.setState(state);
  }

  async _handleLoad() {
    const { current: wrapperElement } = this.wrapperRef;
    const { current: imageElement } = this.imageRef;

    const wrapperSize = Component.getSize(wrapperElement);

    imageElement.style['width'] = wrapperSize['width'] + 'px';

    let imageSize = Component.getSize(imageElement);

    if (imageSize['width'] < wrapperSize['width']) {
      imageElement.style['width'] = wrapperSize['width'] + 'px';
      imageElement.style['height'] = 'auto';
    }
    if (imageSize['height'] < wrapperSize['height']) {
      imageElement.style['width'] = 'auto';
      imageElement.style['height'] = wrapperSize['height'] + 'px';
    }

    imageSize = Component.getSize(imageElement);

    imageElement.style['margin-top'] = `-${imageSize['height'] / 2}px`;
    imageElement.style['margin-left'] = `-${imageSize['width'] / 2}px`;

    this.timeOutInstance = setTimeout(() => this.setState({ isLoading: false, isError: false }), 300);
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutInstance);
  }

  _handleError() {
    this.setState({ isLoading: false, isError: true });
  }

  render() {
    const { isLoading, isError } = this.state;
    const { className, src, mode } = this.props;
    const classNameImageWrapper = cn(className, styles['wrapper'], {
      [styles['wrapper--in-process']]: isLoading,
      [styles['wrapper--error']]: isError,
      [styles['wrapper--primary']]: mode === PRIMARY_MODE,
      [styles['wrapper--success']]: mode === SUCCESS_MODE,
      [styles['wrapper--info']]: mode === INFO_MODE,
      [styles['wrapper--danger']]: mode === DANGER_MODE,
      [styles['wrapper--warning']]: mode === WARNING_MODE,
    });

    return (
      <div ref={this.wrapperRef} className={classNameImageWrapper}>
        <img ref={this.imageRef} className={styles['image']} alt={"No Image"} src={src} onLoad={this._handleLoad.bind(this)} onError={this._handleError.bind(this)} />
        {isLoading && (
          <div className={styles['loading']}>
            <Spinner />
          </div>
        )}
        {isError && (
          <div className={styles['error']}>
            <span className={styles['error__title']}>Что-то пошло<br/>не так</span>
          </div>
        )}
      </div>
    );
  }
}

export default Component;
