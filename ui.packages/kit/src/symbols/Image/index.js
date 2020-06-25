
import types from 'prop-types';
import React, { PureComponent } from 'react';

import Spinner from '../Spinner';

import cn from 'classnames';
import styles from './default.module.scss';
import {sleep} from "@ui.packages/utils";


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

    this._handleLoad = this._handleLoad.bind(this);
    this._handleError = this._handleError.bind(this);
  }

  componentDidMount() {
    const { current: imageElement } = this.imageRef;

    imageElement.addEventListener('load', this._handleLoad);
    imageElement.addEventListener('error', this._handleError);
  }

  componentDidUpdate(prevProps) {
    const { src: prevSrc } = prevProps;
    const { src: nextSrc } = this.props;
    const { current: imageElement } = this.imageRef;

    if (prevSrc !== nextSrc) {

      imageElement.style['width'] = 'auto';
      imageElement.style['height'] = 'auto';

      this.setState({ isError: false, isLoading: true });
    }
  }

  componentWillUnmount() {
    const { current: imageElement } = this.imageRef;

    imageElement.addEventListener('load', this._handleLoad);
    imageElement.addEventListener('error', this._handleError);

    clearTimeout(this.timeOutInstance);
  }

  async _handleLoad() {
    await sleep(100);

    const { current: wrapperElement } = this.wrapperRef;
    const { current: imageElement } = this.imageRef;

    if ( ! wrapperElement || ! imageElement) {
      return void 0;
    }

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

    this.setState({ isLoading: false, isError: false });
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
    const errorIcon = cn(styles['error__icon'], 'far fa-image');

    return (
      <div ref={this.wrapperRef} className={classNameImageWrapper}>
        <img ref={this.imageRef} className={styles['image']} alt={"No Image"} src={src} />
        {isLoading && (
          <div className={styles['loading']}>
            <Spinner />
          </div>
        )}
        {isError && (
          <div className={styles['error']}>
            <i className={errorIcon} />
          </div>
        )}
      </div>
    );
  }
}

export default Component;
