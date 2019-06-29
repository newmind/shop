
import types from 'prop-types';
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';

const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


const Options = React.forwardRef((props, ref) => {
  const { options, optionValue, onCheck } = props;

  const getValue = (value) => {
    if (value instanceof Object) {
      return value[optionValue];
    } else {
      return value;
    }
  };

  return (
    <div ref={ref} className={styles['options']}>
      <div className={styles['options__content']}>
        {options.length
          ? (
            options.map((option, key) => {
              return (
                <span key={key} className={styles['option']} onClick={onCheck.bind(this, option)}>
                  <span className={styles['option__value']}>{getValue(option)}</span>
                </span>
              );
            })
          )
          : (
            <span className={styles['options__empty']}>Нет данных</span>
          )}
      </div>
    </div>
  );
});

class Component extends PureComponent {
  static propTypes = {
    className: types.string,
    label: types.string,
    simple: types.bool,
    message: types.string,
    mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
    disabled: types.bool,
    value: types.any,
    options: types.array,
    optionKey: types.string,
    optionValue: types.string,
    onChange: types.func,
    onFocus: types.func,
    onBlur: types.func,
  };

  static defaultProps = {
    className: '',
    label: '',
    simple: false,
    message: '',
    mode: 'default',
    disabled: false,
    options: [],
    optionKey: 'id',
    optionValue: 'value',
    value: '',
  };

  inputRef = React.createRef();
  selectRef = React.createRef();
  optionsRef = React.createRef();
  messageRef = React.createRef();

  state = {
    isOpen: false,
    isFocus: false,
    value: ''
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
    document.addEventListener('scroll', this._eventHandleScrolling);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this._calculateTooltipPosition();
  }

  componentWillUnmount() {
    window.removeEventListener('click', this._eventReset);
    window.removeEventListener('resize', this._eventHandleResize);
    document.removeEventListener('scroll', this._eventHandleScrolling);
  }

  _calculateTooltipPosition() {

    const { message } = this.props;
    const {current: selectRef} = this.selectRef;
    const {current: messageElement} = this.messageRef;

    if (message) {

      const selectRect = selectRef.getBoundingClientRect();
      const messageRect = messageElement.getBoundingClientRect();

      messageElement.style['top'] = selectRect['top'] - ((messageRect['height'] - selectRect['height']) / 2) + 2 + 'px';
      messageElement.style['left'] = selectRect['right'] + 8 + 'px';
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
      this._calculateTooltipPosition();
    }
  }

  _eventHandleResize() {
    const { isOpen } = this.state;
    if (isOpen) {
      this._handleOnBlur();
      this._calculateTooltipPosition();
    }
  }

  _handleSetFocus() {
    const { onFocus } = this.props;
    const { current: selectRef } = this.selectRef;
    // const { current: inputRef } = this.inputRef;
    const { current: optionsRef } = this.optionsRef;

    const selectRect = selectRef.getBoundingClientRect();

    // inputRef.focus();

    optionsRef.style['top'] = selectRect['bottom'] + 'px';
    optionsRef.style['width'] = selectRect['width'] + 'px';

    onFocus();
  }

  _applyValue(value) {
    const { optionKey, simple } = this.props;
    if (value instanceof Object) {
      if (simple) {
        return value[optionKey];
      } else {
        return value;
      }
    } else {
      return value;
    }
  }

  _getValue(value) {
    const { simple, options, optionKey, optionValue } = this.props;
    if (simple) {
      const option = options.find(option => option[optionKey] === value);
      if (option) {
        return option[optionValue];
      }
    } else {
      if (value instanceof Object) {
        return value[optionValue];
      } else {
        return value;
      }
    }
  }

  _handleOnFocus() {
    const { isFocus } = this.state;
    if ( ! isFocus) {
      this.setState({ isOpen: true }, this._handleSetFocus.bind(this));
    }
  }

  _handleOnBlur() {
    const { onBlur } = this.props;
    this.setState({ isOpen: false }, () => {
      onBlur();
    });
  }

  _handleOnChange(option) {
    const { onChange } = this.props;
    this.setState({ isOpen: false }, () => onChange && onChange(this._applyValue(option)));
  }

  _handleInputOnChange(event) {
    const { value } = event['target'];
    this.setState({ value });
  }

  _handleResetValue() {
    const { onChange } = this.props;
    this.setState({ isOpen: false }, () => onChange && onChange(null));
  }

  _renderInput() {
    const { value: inputValue } = this.state;
    const { value, optionValue } = this.props;
    return (
      <input
        ref={this.inputRef}
        className={styles['select__input']}
        value={inputValue || value && value[optionValue]}
        onBlur={this._handleOnBlur.bind(this)}
        onChange={this._handleInputOnChange.bind(this)}
      />
    );
  }

  _renderValue() {
    const { value } = this.props;
    const selectedValue = value && this._getValue(value) || null;
    return (
      <span className={styles['select__values']} onClick={this._handleOnFocus.bind(this)}>
        {selectedValue
          ? <span className={styles['select__value']}>{selectedValue}</span>
          : <span className={styles['select__placeholder']}>Выбери значение</span>}
      </span>
    );
  }

  _renderCancel() {
    const classNameMarker = cn(styles['select__marker'], 'fas fa-times');
    return (
      <span className={styles['select__cross']} onClick={this._handleResetValue.bind(this)}>
        <span className={classNameMarker}/>
      </span>
    );
  }

  _renderMarker() {
    const { isOpen } = this.state;
    const classNameMarker = cn(styles['select__marker'], {
      'fas fa-angle-down': ! isOpen,
      'fas fa-angle-up': isOpen,
    });
    return (
      <span className={styles['select__angle']} onClick={this._handleOnFocus.bind(this)}>
        <span className={classNameMarker} />
      </span>
    );
  }

  render() {
    const { isOpen } = this.state;
    const { className, disabled, message, mode, options, optionKey, optionValue, value, label } = this.props;
    const classNameSelectWrapper = cn(className, styles['wrapper'], {
      [styles['wrapper--primary']]: mode === PRIMARY_MODE,
      [styles['wrapper--success']]: mode === SUCCESS_MODE,
      [styles['wrapper--info']]: mode === INFO_MODE,
      [styles['wrapper--danger']]: mode === DANGER_MODE,
      [styles['wrapper--warning']]: mode === WARNING_MODE,
      [styles['wrapper--disabled']]: disabled,
      [styles['wrapper--is-focus']]: isOpen,
    });

    return (
      <div className={classNameSelectWrapper}>
        {label && (
          <p className={styles['label']}>{ label }</p>
        )}
        <div ref={this.selectRef} className={styles['select']}>
          <span className={styles['select__content']}>
            { this._renderValue() }
          </span>
          <span className={styles['select__controls']}>
            { !! value && this._renderCancel()}
            {this._renderMarker()}
          </span>
          { ! disabled && message && (
            <span ref={this.messageRef} className={styles['tooltip']}>
              <span className={styles['tooltip__message']}>{ message }</span>
            </span>
          )}
          {isOpen && <Options ref={this.optionsRef} options={options} optionKey={optionKey} optionValue={optionValue} onCheck={this._handleOnChange.bind(this)} />}
        </div>
      </div>
    );
  }
}

export default Component;
