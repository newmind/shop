
import types from 'prop-types';
import React, { Component as PureComponent } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


const Options = React.forwardRef((props, ref) => {
  const { value, options, optionKey, optionValue, onCheck, optionTransform, optionTemplate } = props;

  const getValue = (value) => {
    if (value instanceof Object) {
      if (optionTransform) {
        return optionTransform(value);
      }
      return value[optionValue];
    } else {
      return value;
    }
  };

  const getKey = (value) => {
    if (value instanceof Object) {
      return value[optionKey];
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
              const classNameOption = cn(styles['option'], {
                [styles['option--selected']]: getKey(value) === getKey(option),
              });
              return (
                <span key={key} className={classNameOption} onClick={onCheck.bind(this, option)}>
                  {optionTemplate
                    ? optionTemplate(option)
                    : <span className={styles['option__value']}>{getValue(option)}</span>}
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
    defaultKey: types.any,
    label: types.string,
    simple: types.bool,
    clearable: types.bool,
    message: types.string,
    mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
    disabled: types.bool,
    value: types.any,
    options: types.array,
    optionKey: types.string,
    optionValue: types.string,
    placeholder: types.string,
    valueTransform: types.func,
    optionTransform: types.func,
    optionTemplate: types.func,
    onChange: types.func,
    onFocus: types.func,
    onBlur: types.func,
  };

  static defaultProps = {
    className: '',
    label: '',
    simple: false,
    clearable: true,
    message: '',
    mode: 'default',
    disabled: false,
    options: [],
    optionKey: 'id',
    optionValue: 'value',
    value: '',
    placeholder: 'Выбери значение'
  };

  inputRef = React.createRef();
  selectRef = React.createRef();
  optionsRef = React.createRef();
  messageRef = React.createRef();

  state = {
    isDirectUp: false,
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
    document.querySelector('#root').addEventListener('scroll', this._eventHandleScrolling);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isOpen } = this.state;
    isOpen && this._calculateDirection();
  }

  componentWillUnmount() {
    window.removeEventListener('click', this._eventReset);
    window.removeEventListener('resize', this._eventHandleResize);
    document.querySelector('#root').removeEventListener('scroll', this._eventHandleScrolling);
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

    optionsRef.style['width'] = selectRect['width'] + 'px';

    onFocus && onFocus();
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
    const { simple, options, optionKey, optionValue, valueTransform } = this.props;
    const option = options.find(option => {
      if (simple) {
        return (option[optionKey] === value);
      }
      return (option[optionKey] === value[optionKey]) && (option[optionValue] === value[optionValue])
    });

    if (option) {
      if (valueTransform) {
        return valueTransform(option);
      }
      else if (value instanceof Object) {
        return option[optionValue];
      } else {
        if (simple) {
          return option[optionValue]
        }
        return option;
      }
    } else {
      return null;
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
    this.setState({ isOpen: false, isDirectUp: false }, () => onBlur && onBlur());
  }

  _handleOnChange(option) {
    const { onChange } = this.props;
    this.setState({ isOpen: false, isDirectUp: false }, () => onChange && onChange(this._applyValue(option)));
  }

  _handleInputOnChange(event) {
    const { value } = event['target'];
    this.setState({ value });
  }

  _handleResetValue() {
    const { onChange } = this.props;
    this.setState({ isOpen: false, isDirectUp: false }, () => onChange && onChange(null));
  }

  // _renderInput() {
  //   const { value: inputValue } = this.state;
  //   const { value, optionValue } = this.props;
  //   return (
  //     <input
  //       ref={this.inputRef}
  //       className={styles['select__input']}
  //       value={inputValue || value && value[optionValue]}
  //       onBlur={this._handleOnBlur.bind(this)}
  //       onChange={this._handleInputOnChange.bind(this)}
  //     />
  //   );
  // }

  _renderValue() {
    const { value, placeholder } = this.props;
    const selectedValue = (value && this._getValue(value)) || null;
    return (
      <span className={styles['select__values']} onClick={this._handleOnFocus.bind(this)}>
        {selectedValue
          ? (<span className={styles['select__value']}>
              <span className={styles['select__text']}>{selectedValue}</span>
            </span>)
          : (<span className={styles['select__placeholder']}>
              <span className={styles['select__text']}>{ placeholder }</span>
            </span>)
        }
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
    const { className, disabled, mode, options, optionKey, optionValue, value, optionTransform, optionTemplate } = this.props;
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
            {this._renderValue()}
          </span>
          <span className={styles['select__controls']}>
            { !! value && this._renderCancel()}
            {this._renderMarker()}
          </span>
          {isOpen && (
            <Options
              ref={this.optionsRef}
              value={value}
              options={options}
              optionKey={optionKey}
              optionValue={optionValue}
              optionTransform={optionTransform}
              optionTemplate={optionTemplate}
              onCheck={this._handleOnChange.bind(this)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Component;
