
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Field } from 'redux-form';

import Input from '../../symbols/Input';

import cn from "classnames";
import styles from "../../symbols/Input/default.module.scss";

const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


// const InputField = ({ input, label, mode, type, disabled, meta: { touched, error } }) => {

// };

class FieldComponent extends PureComponent {
  static propTypes = {
    className: types.string,
    label: types.string,
    mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
    value: types.any,
    disabled: types.bool,
    message: types.string,
    onChange: types.func,
    onInput: types.func,
  };

  static defaultProps = {
    className: '',
    type: 'text',
    mode: 'default',
    label: null,
    message: null,
    value: '',
    disabled: false,
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

      messageElement.style['top'] = containerRect['top'] - ((messageRect['height'] - containerRect['height']) / 2) + 2 + 'px';
      messageElement.style['left'] = containerRect['right'] + 8 + 'px';
    }
  }

  componentDidMount() {

    document.addEventListener('scroll', this._resizeEvent);
    window.addEventListener('resize', this._scrollEvent);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this._calculateTooltipPosition();
  }

  componentWillUnmount() {

    document.removeEventListener('scroll', this._resizeEvent);
    window.removeEventListener('resize', this._scrollEvent);
  }

  render() {
    const { input, label, mode, type, disabled, meta: { touched, error }} = this.props;
    const classNameInputWrapper = cn(styles['wrapper'], {
      [styles['wrapper--primary']]: mode === PRIMARY_MODE,
      [styles['wrapper--success']]: mode === SUCCESS_MODE,
      [styles['wrapper--info']]: mode === INFO_MODE,
      [styles['wrapper--danger']]: mode === DANGER_MODE,
      [styles['wrapper--warning']]: mode === WARNING_MODE,
      [styles['wrapper--disabled']]: disabled,
    });

    return (
      <div className={classNameInputWrapper}>
        {label && (
          <p className={styles['label']}>{ label }</p>
        )}
        <div ref={this.containerRef} className={styles['container']}>
          <Input type={type} {...input} mode={mode || (touched && error && 'danger' || 'default')} />
          { ! disabled && error && (
            <span ref={this.messageRef} className={styles['tooltip']}>
            <span className={styles['tooltip__message']}>{ error }</span>
          </span>
          )}
        </div>
      </div>
    );
  }
}

class Component extends PureComponent {
  static propTypes = {
    name: types.string,
    mode: types.string,
    label: types.string,
    type: types.string,
    disabled: types.bool,
  };

  render() {
    const { name, label, type } = this.props;
    return (
      <Field name={name} type={type} label={label} component={FieldComponent} />
    );
  }
}

export default Component;
