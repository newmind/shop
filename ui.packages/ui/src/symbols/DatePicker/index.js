
import types from 'prop-types';
import React, { Component as PureComponent } from 'react';

import moment from '@ui.packages/moment';
import { reduceToArray } from '@ui.packages/utils';

import cn from 'classnames';
import styles from './default.module.scss';

const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';

const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const weeks = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];


class Weeks extends PureComponent {
  static propTypes = {
    number: types.number,
    onChange: types.func,
  };

  static defaultProps = {
    number: 0,
  };

  _handlePrevClick() {
    const { number, onChange } = this.props;
    let prevNumber = number - 1;
    if (prevNumber < 0) {
      prevNumber = weeks.length - 1;
    }
    onChange(prevNumber);
  }

  _handleNextClick() {
    const { number, onChange } = this.props;
    let nextNumber = number - 1;
    if (nextNumber > weeks.length - 1) {
      nextNumber = 0;
    }
    onChange(nextNumber);
  }

  render() {
    const { number } = this.props;
    const prevClassName = cn(styles['week__prev'], 'fas fa-caret-left');
    const nextClassName = cn(styles['week__next'], 'fas fa-caret-right');
    return (
      <div className={styles['week']}>
        <span className={prevClassName} onClick={this._handlePrevClick.bind(this)} />
        <span className={styles['week__value']}>{ weeks[number] }</span>
        <span className={nextClassName} onClick={this._handleNextClick.bind(this)} />
      </div>
    );
  }
}

class Year extends PureComponent {
  static propTypes = {
    number: types.number,
    onChange: types.func,
  };

  static defaultProps = {
    number: new Date().getFullYear(),
  };

  _handlePrevClick() {
    const { number, onChange } = this.props;
    let prevNumber = number - 1;
    if (prevNumber < 0) {
      prevNumber = weeks.length - 1;
    }
    onChange(prevNumber);
  }

  _handleNextClick() {
    const { number, onChange } = this.props;
    let nextNumber = number - 1;
    if (nextNumber > weeks.length - 1) {
      nextNumber = 0;
    }
    onChange(nextNumber);
  }

  render() {
    const { number } = this.props;
    const prevClassName = cn(styles['year__prev'], 'fas fa-caret-left');
    const nextClassName = cn(styles['year__next'], 'fas fa-caret-right');
    return (
      <div className={styles['year']}>
        <span className={prevClassName} onClick={this._handlePrevClick.bind(this)} />
        <span className={styles['year__value']}>{ number }</span>
        <span className={nextClassName} onClick={this._handleNextClick.bind(this)} />
      </div>
    );
  }
}

class Days extends PureComponent {
  static propTypes = {
    value: types.object,
    onChange: types.func,
  };

  _calculateDates() {
    const { value } = this.props;
    // const currentYear = value.year();
    // const currentMonth = value.month();

    const lastDay = value.endOf('month').date(); //new Date(currentYear, currentMonth + 1, 0).getDate();
    // const today = new Date(currentYear, currentMonth, lastDay);


    const weekDayOfLastDayOfMonth = value.endOf('month').day(); //new Date(today.getFullYear(),today.getMonth(), lastDay).getDay();
    const weekDayOfFirstDayOfMonth = value.startOf('month').day(); //new Date(today.getFullYear(),today.getMonth(),1).getDay();

    const squares = [];

    squares.push(...days);

    if (weekDayOfFirstDayOfMonth !== 0) {
      for(let  i = 1; i < weekDayOfFirstDayOfMonth; i++) {
        squares.push(null);
      }
    } else {
      for(let i = 0; i < 6; i++) {
        squares.push(null);
      }
    }

    for(let i = 1; i <= lastDay; i++) {
      squares.push(i);
    }

    if (weekDayOfLastDayOfMonth !== 0) {
      for(let i = weekDayOfLastDayOfMonth; i < 7; i++) {
        squares.push(null);
      }
    }

    return reduceToArray(squares, 7);
  }

  render() {
    const days = this._calculateDates();
    return (
      <div className={styles['board']}>
        {days.map((week, weekKey) => (
          <div key={weekKey} className={styles['board__week']}>
            {week.map((day, dayKey) => (
              <div key={dayKey} className={styles['board__day']}>{ day }</div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

const DatePickerBoard = React.forwardRef((props, ref) => {
  const { value } = props;

  const prevClassName = cn(styles['dates__prev'], 'fas fa-caret-left');
  const nextClassName = cn(styles['dates__next'], 'fas fa-caret-right');

  return (
    <div ref={ref} className={styles['dates']}>
      <div className={styles['dates__content']}>
        <div className={styles['dates__control']}>
          <div className={styles['dates__left']}>
            <span className={prevClassName} />
          </div>
          <div className={styles['dates__center']}>
            <Weeks number={1} />
            <Year />
          </div>
          <div className={styles['dates__right']}>
            <span className={nextClassName} />
          </div>
        </div>
        <div className={styles['dates__days']}>
          <Days value={value} />
        </div>
      </div>
    </div>
  );
});


class Component extends PureComponent {
  static propTypes = {
    className: types.string,
    label: types.string,
    value: types.any,
    displayFormat: types.string,
    format: types.string,
    message: types.string,
    mode: types.string,
    disabled: types.bool,
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
    value: moment(),
    format: 'DD.MM.YYYY',
    displayFormat: 'DD.MM.YYYY',
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

  _calculateTooltipPosition() {

    const { message } = this.props;
    const {current: selectRef} = this.selectRef;
    const {current: messageElement} = this.messageRef;

    if (message) {

      const selectRect = selectRef.getBoundingClientRect();
      const messageRect = messageElement.getBoundingClientRect();

      messageElement.style['top'] = selectRect['top'] - ((messageRect['height'] - selectRect['height']) / 2) + 2 + 'px';
      // messageElement.style['left'] = selectRect['right'] + 6 + 'px';
    }
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
    // const { current: selectRef } = this.selectRef;
    // const { current: inputRef } = this.inputRef;
    // const { current: optionsRef } = this.optionsRef;

    // const selectRect = selectRef.getBoundingClientRect();

    // inputRef.focus();

    // optionsRef.style['width'] = selectRect['width'] + 'px';

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
    const { simple, options, optionKey, optionValue } = this.props;
    const option = options.find(option => {
      if (simple) {
        return (option[optionKey] === value);
      }
      return (option[optionKey] === value[optionKey]) && (option[optionValue] === value[optionValue])
    });

    if (option) {
      if (value instanceof Object) {
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
    // const { value } = this.props;
    const selectedValue = null;// (value && this._getValue(value)) || null;
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
    const { className, disabled, message, mode, value, label } = this.props;
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
    const transformedValue = moment(value);

    return (
      <div className={classNameSelectWrapper}>
        {label && (
          <p className={styles['label']}>{ label }</p>
        )}
        <div ref={this.selectRef} className={classNameSelect}>
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
          {isOpen && (
            <DatePickerBoard
              ref={this.optionsRef}
              value={transformedValue}
              onCheck={this._handleOnChange.bind(this)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Component;
