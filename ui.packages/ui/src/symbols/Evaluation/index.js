
import types from 'prop-types';
import React, { PureComponent } from 'react';

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
    label: types.string,
    mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
    value: types.oneOf([0, 1, 2, 3, 4, 5]),
    size: types.oneOf(['s', 'm', 'l']),
    disabled: types.bool,
    message: types.string,
  };

  static defaultProps = {
    className: '',
    label: '',
    mode: 'default',
    value: 0,
    size: 'm',
    disabled: false,
    message: '',
  };

  messageRef = React.createRef();
  containerRef = React.createRef();

  constructor(props) {
    super(props);

    this._scrollEvent = this._scrollEvent.bind(this);
    this._resizeEvent = this._resizeEvent.bind(this);
  }

  _scrollEvent() {
    this._calculateTooltipPosition();
  }

  _resizeEvent() {
    this._calculateTooltipPosition();
  }

  _calculateTooltipPosition() {

    const { message } = this.props;
    const {current: containerElement} = this.containerRef;
    const {current: messageElement} = this.messageRef;

    if (message) {

      const containerRect = containerElement.getBoundingClientRect();
      const messageRect = messageElement.getBoundingClientRect();

      messageElement.style['top'] = containerRect['top'] - ((messageRect['height'] - containerRect['height']) / 2) + 'px';
      messageElement.style['left'] = containerRect['right'] + 8 + 'px';
    }
  }

  componentDidMount() {

    document.querySelector('#root').addEventListener('scroll', this._resizeEvent);
    window.addEventListener('resize', this._scrollEvent);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this._calculateTooltipPosition();
  }

  componentWillUnmount() {

    document.querySelector('#root').removeEventListener('scroll', this._resizeEvent);
    window.removeEventListener('resize', this._scrollEvent);
  }

  _handleClick(index) {
    const { onChange } = this.props;
    onChange && onChange(index);
  }

  render() {
    const { className, label, size, mode, value, disabled } = this.props;
    const classNameInputWrapper = cn(className, styles['wrapper'], {
      [styles['wrapper--primary']]: mode === PRIMARY_MODE,
      [styles['wrapper--success']]: mode === SUCCESS_MODE,
      [styles['wrapper--info']]: mode === INFO_MODE,
      [styles['wrapper--danger']]: mode === DANGER_MODE,
      [styles['wrapper--warning']]: mode === WARNING_MODE,
      [styles['wrapper--disabled']]: disabled,
      [styles['wrapper--with-label']]: !! label,
    }, {
      [styles['wrapper--small']]: size === 's',
      [styles['wrapper--large']]: size === 'l',
    });
    return (
      <div className={classNameInputWrapper}>
        {label && (
          <p className={styles['label']}>{ label }</p>
        )}
        <div ref={this.containerRef} className={styles['container']}>
          <div className={styles['evaluation']}>
            <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 1, 'far fa-star': value < 1 })} onClick={this._handleClick.bind(this, 1)} />
            <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 2, 'far fa-star': value < 2 })} onClick={this._handleClick.bind(this, 2)} />
            <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 3, 'far fa-star': value < 3 })} onClick={this._handleClick.bind(this, 3)} />
            <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 4, 'far fa-star': value < 4 })} onClick={this._handleClick.bind(this, 4)} />
            <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 5, 'far fa-star': value < 5 })} onClick={this._handleClick.bind(this, 5)} />
          </div>
        </div>
      </div>
    );
  }
}

export default Component;
