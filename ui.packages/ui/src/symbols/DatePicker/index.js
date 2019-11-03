
import moment from '@ui.packages/moment';

import types from 'prop-types';
import React, { Component as PureComponent } from 'react';

import Dashboard from './Dashboard';

import cn from 'classnames';
import styles from './default.module.scss';


const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


const DatePickerBoard = React.forwardRef((props, ref) => {
  const { value, maxDate, minDate, onChange } = props;
  return (
    <div ref={ref} className={styles['dates']}>
      <div className={styles['dates__content']}>
        <Dashboard value={value} maxDate={maxDate} minDate={minDate} onChange={onChange} />
      </div>
    </div>
  );
});


class Component extends PureComponent {
  static propTypes = {
    className: types.string,
    label: types.string,
    value: types.any,
    minDate: types.any,
    maxDate: types.any,
    displayFormat: types.string,
    format: types.string,
    message: types.string,
    mode: types.string,
    disabled: types.bool,
    scroller: types.string,
    onChange: types.func,
    onFocus: types.func,
    onBlur: types.func,
  };

  static defaultProps = {
    className: '',
    label: '',
    message: '',
    mode: 'default',
    disabled: false,
    value: null,
    minDate: null,
    maxDate: null,
    format: 'YYYY-MM-DD HH:mm:ss.SSSSSSZ',
    displayFormat: 'DD.MM.YYYY',
    scroller: 'body',
  };

  inputRef = React.createRef();
  selectRef = React.createRef();
  optionsRef = React.createRef();
  messageRef = React.createRef();

  state = {
    isDirectUp: false,
    isOpen: false,
    isFocus: false,
  };

  constructor(props) {
    super(props);

    this._eventReset = this._eventReset.bind(this);
    this._eventHandleResize = this._eventHandleResize.bind(this);
    this._eventHandleScrolling = this._eventHandleScrolling.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this._eventReset);
    window.addEventListener('resize', this._eventHandleResize);
    document.querySelector('body').addEventListener('scroll', this._eventHandleScrolling);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isOpen } = this.state;
    isOpen && this._calculateDirection();
  }

  componentWillUnmount() {
    window.removeEventListener('click', this._eventReset);
    window.removeEventListener('resize', this._eventHandleResize);
    document.querySelector('body').removeEventListener('scroll', this._eventHandleScrolling);
  }

  _calculateDirection() {

    const { isDirectUp } = this.state;
    const { current: selectElement } = this.selectRef;
    const { current: optionsElement } = this.optionsRef;

    const selectRECT = selectElement.getBoundingClientRect();
    const optionsRECT = optionsElement.getBoundingClientRect();
    const viewportRECT = document.body.getBoundingClientRect();

    if ( ! isDirectUp && optionsRECT['bottom'] + 20 >= viewportRECT['bottom']) {
      if (optionsRECT['bottom'] + 50 >= viewportRECT['bottom']) {
        this.setState({isDirectUp: true}, () => {
          optionsElement.style['top'] = 'auto';
          optionsElement.style['bottom'] = viewportRECT['bottom'] - selectRECT['top'] + 4 + 'px';
        });
      }
    }

    if ( ! isDirectUp && optionsRECT['bottom'] + 20 <= viewportRECT['bottom']) {
      optionsElement.style['top'] = selectRECT['bottom'] + 'px';
    }
  }

  _eventReset(event) {
    const { isOpen } = this.state;
    const {current: selectElement} = this.selectRef;
    const target = event.target;
    if (selectElement && ! selectElement.contains(target)) {
      isOpen && this._handleOnBlur();
    }
  }

  _eventHandleScrolling() {
    const { isOpen } = this.state;
    if (isOpen) {
      this._handleOnBlur();
    }
  }

  _eventHandleResize() {
    const { isOpen } = this.state;
    if (isOpen) {
      this._handleOnBlur();
    }
  }

  _handleSetFocus() {
    const { onFocus } = this.props;
    onFocus && onFocus();
  }

  _handleOnFocus() {
    const { isFocus } = this.state;
    if ( ! isFocus) {
      this.setState({ isOpen: true }, this._handleSetFocus.bind(this));
    }
  }

  _handleOnBlur() {
    const { onBlur } = this.props;
    this.setState({ isOpen: false, isDirectUp: false }, () => onBlur && onBlur());
  }

  _handleOnChange(value) {
    const { format, onChange } = this.props;
    this.setState({ isOpen: false, isDirectUp: false }, () => onChange && onChange(value.format(format)));
  }

  _handleResetValue() {
    const { onChange } = this.props;
    this.setState({ isOpen: false, isDirectUp: false }, () => onChange && onChange(''));
  }

  _renderValue(value) {
    const { displayFormat } = this.props;
    const selectedValue = value ? moment(value).format(displayFormat) : null;// (value && this._getValue(value)) || null;
    return (
      <span className={styles['select__values']} onClick={this._handleOnFocus.bind(this)}>
        {selectedValue
          ? <span className={styles['select__value']}>{selectedValue}</span>
          : <span className={styles['select__placeholder']}>Выбери значение</span>}
      </span>
    );
  }

  _renderCancel() {
    const { clearable } = this.props;
    const classNameMarker = cn(styles['select__marker'], 'fas fa-times');
    return clearable && (
      <span className={styles['select__cross']} onClick={this._handleResetValue.bind(this)}>
        <span className={classNameMarker}/>
      </span>
    );
  }

  _renderMarker() {
    const classNameMarker = cn(styles['select__marker'], 'far fa-calendar-alt');
    return (
      <span className={styles['select__angle']} onClick={this._handleOnFocus.bind(this)}>
        <span className={classNameMarker} />
      </span>
    );
  }

  render() {
    const { isOpen } = this.state;
    const { className, disabled, mode, value, minDate, maxDate } = this.props;
    const classNameSelectWrapper = cn(className, styles['wrapper'], {
      [styles['wrapper--primary']]: mode === PRIMARY_MODE,
      [styles['wrapper--success']]: mode === SUCCESS_MODE,
      [styles['wrapper--info']]: mode === INFO_MODE,
      [styles['wrapper--danger']]: mode === DANGER_MODE,
      [styles['wrapper--warning']]: mode === WARNING_MODE,
      [styles['wrapper--disabled']]: disabled,
    });
    const classNameSelect = cn(styles['select'], {
      [styles['select--is-focus']]: isOpen,
    });

    return (
      <div className={classNameSelectWrapper}>
        <div ref={this.selectRef} className={classNameSelect}>
          <span className={styles['select__content']}>
            { this._renderValue(value) }
          </span>
          <span className={styles['select__controls']}>
            { !! value && this._renderCancel()}
            {this._renderMarker()}
          </span>
          {isOpen && (
            <DatePickerBoard
              ref={this.optionsRef}
              value={value}
              minDate={minDate}
              maxDate={maxDate}
              onChange={this._handleOnChange.bind(this)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Component;
