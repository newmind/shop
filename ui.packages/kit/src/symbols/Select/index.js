
import types from 'prop-types';
import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';

import Option from './Option';

import cn from 'classnames';
import styles from './default.module.scss';


const INFO_MODE = 'info';
const DANGER_MODE = 'danger';
const WARNING_MODE = 'warning';
const SUCCESS_MODE = 'success';
const PRIMARY_MODE = 'primary';


function Select({
                  className,
                  clearable,
                  mode,
                  value,
                  placeholder,
                  optionKey,
                  simple,
                  options,
                  disabled,
                  optionValue,
                  valueTransform,
                  calculateTooltipPosition,
                  optionTransform,
                  optionTemplate,
                  onBlur,
                  onFocus,
                  onChange,
}) {
  const selectRef = useRef(null);
  const optionsRef = useRef(null);

  const [isOpen, setOpen] = useState(false);
  const [isFocus, setFocus] = useState(false);
  const [isValue, setValue] = useState(value);

  useEffect(() => {
    function eventReset(event) {
      const { current: selectElement } = selectRef;
      const target = event.target;
      if (selectElement && ! selectElement.contains(target)) {
        isOpen && handleOnBlur();
      }
    }

    function eventHandleScrolling() {
      if (isOpen) {
        handleOnBlur();
      }
    }

    function eventHandleResize() {
      if (isOpen) {
        handleOnBlur();
        calculateTooltipPosition();
      }
    }

    window.addEventListener('click', eventReset);
    window.addEventListener('resize', eventHandleResize);
    document.querySelector('#root').addEventListener('scroll', eventHandleScrolling);

    return () => {
      window.removeEventListener('click', eventReset);
      window.removeEventListener('resize', eventHandleResize);
      document.querySelector('#root').removeEventListener('scroll', eventHandleScrolling);
    };
  });

  useLayoutEffect(() => {
    // isOpen && calculateDirection();
  }, [isOpen]);

  // function calculateDirection() {
  //   const { current: selectElement } = selectRef;
  //   const { current: optionsElement } = optionsRef;
  //
  //   const selectRECT = selectElement.getBoundingClientRect();
  //   const optionsRECT = optionsElement.getBoundingClientRect();
  //   const viewportRECT = document.body.getBoundingClientRect();
  //
  //   if ( ! isDirectUp && optionsRECT['bottom'] + 20 >= viewportRECT['bottom']) {
  //     if (optionsRECT['bottom'] + 50 >= viewportRECT['bottom']) {
  //       setDirectUp(true);
  //       optionsElement.style['top'] = 'auto';
  //       optionsElement.style['bottom'] = viewportRECT['bottom'] - selectRECT['top'] + 4 + 'px';
  //     }
  //   }
  //
  //   if ( ! isDirectUp && optionsRECT['bottom'] + 20 <= viewportRECT['bottom']) {
  //     optionsElement.style['top'] = selectRECT['bottom'] + 'px';
  //   }
  // }

  function handleSetFocus() {
    const { current: selectElement } = selectRef;
    const { current: optionsElement } = optionsRef;

    const selectRect = selectElement.getBoundingClientRect();

    optionsElement.style['width'] = selectRect['width'] + 'px';
    setFocus(true);
    onFocus && onFocus();
  }

  function applyValue(value) {
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

  function getValue(value) {
    const option = options.find((option) => {
      if (simple) {
        return (option[optionKey] === value);
      }
      return (option[optionKey] === value[optionKey]) && (option[optionValue] === value[optionValue]);
    });

    if (option) {
      if (valueTransform) {
        return valueTransform(option);
      }
      else if (value instanceof Object) {
        return option[optionValue];
      } else {
        if (simple) {
          return option[optionValue];
        }
        return option;
      }
    } else {
      return null;
    }
  }

  function handleOnFocus() {
    if (disabled) {
      return void 0;
    }

    if ( ! isFocus) {
      setOpen(true);
      handleSetFocus();
    }
  }

  function handleOnBlur() {
    setOpen(false);
    setDirectUp(false);
    onBlur && onBlur();
  }

  function handleOnChange(option) {
    setOpen(false);
    setDirectUp(false);
    onChange && onChange(applyValue(option));
  }

  function handleInputOnChange(event) {
    setValue(isValue);
  }

  function handleResetValue() {
    if (disabled) {
      return void 0;
    }
    setOpen(false);
    setDirectUp(false);
    onChange && onChange(null);
  }

  function renderValue() {
    const selectedValue = (isValue && getValue(isValue)) || null;

    return (
      <span className={styles['select__values']}>
        {selectedValue
          ? (<span className={styles['select__value']}>
              <span className={styles['select__text']}>{ selectedValue }</span>
            </span>)
          : (<span className={styles['select__placeholder']}>
              <span className={styles['select__text']}>{ placeholder }</span>
            </span>)
        }
      </span>
    );
  }

  function renderCancel() {
    const classNameMarker = cn(styles['select__marker'], 'fas fa-times');

    return clearable && (
      <span className={styles['select__cross']} onClick={handleResetValue}>
        <span className={classNameMarker}/>
      </span>
    );
  }

  function renderMarker() {
    const classNameMarker = cn(styles['select__marker'], {
      'fas fa-angle-down': ! isOpen,
      'fas fa-angle-up': isOpen,
    });

    return (
      <span className={styles['select__angle']}>
        <span className={classNameMarker} />
      </span>
    );
  }

  const classNameSelectWrapper = cn(className, styles['wrapper'], {
    [styles['wrapper--primary']]: mode === PRIMARY_MODE,
    [styles['wrapper--success']]: mode === SUCCESS_MODE,
    [styles['wrapper--info']]: mode === INFO_MODE,
    [styles['wrapper--danger']]: mode === DANGER_MODE,
    [styles['wrapper--warning']]: mode === WARNING_MODE,
  });
  const classNameSelect = cn(styles['select'], {
    [styles['select--is-focus']]: isOpen,
    [styles['select--disabled']]: disabled,
  });

  return (
    <div className={classNameSelectWrapper}>
      <div ref={selectRef} className={classNameSelect}>
        <div className={styles['select__container']} tabIndex={0} onClick={handleOnFocus}>
          <span className={styles['select__content']}>
            { renderValue() }
          </span>
          <span className={styles['select__controls']}>
            { !! value && renderCancel() }
            { renderMarker() }
          </span>
        </div>
        {isOpen && (
          <div ref={optionsRef} className={styles['options']}>
            <div className={styles['options__content']}>
              {options.map((option, key) => (
                <Option
                  key={key}
                  value={value}
                  option={option}
                  optionKey={optionKey}
                  optionValue={optionValue}
                  optionTransform={optionTransform}
                  optionTemplate={optionTemplate}
                  onCheck={handleOnChange}
                />
              ))}
            </div>
          </div>

        )}
      </div>
    </div>
  );
}

Select.propTypes = {
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

Select.defaultProps = {
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

export default Select;
