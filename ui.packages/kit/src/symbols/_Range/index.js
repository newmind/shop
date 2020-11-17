
import types from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';

import Marker from './Marker';
import Track from './Track';

import Context from './Context';

import styles from './default.module.scss';


function getCoords(element) {
  const rect = element.getBoundingClientRect();
  return {
    top: rect['top'],
    right: rect['right'],
    bottom: rect['bottom'],
    left: rect['left'],
    width: rect['width'],
  };
}

function Scroller({ step, value, min, max, onFocus, onChange, onBlur }) {
  const wrapperRef = useRef(null);
  const [ selectValue, setValue ] = useState(value);

  useEffect(function checkValues() {
    const { current: wrapperElement } = wrapperRef;
    const parentCoords = getCoords(wrapperElement);
    function handleClick(event) {
      const value = Math.ceil((max - min) * event['layerX'] / (parentCoords['width']) + min);
      setValue([value]);
      onChange && onChange(value);
    }

    wrapperElement.addEventListener('click', handleClick);
    return () => {
      wrapperElement.removeEventListener('click', handleClick);
    };
  });

  function handleFocus() {
    onFocus && onFocus();
  }

  function handleChange(data) {
    setValue(data);
    onChange && onChange(data);
  }

  function handleBlur() {
    onBlur && onBlur();
  }

  return (
    <Context.Provider value={{
      step,
      parentRef: wrapperRef,
      getCoords,
    }}>
      <div className={styles['wrapper']}>
        <div ref={wrapperRef} className={styles['scroller']}>
          {(typeof selectValue === 'number')
            ? (
              <Marker
                value={selectValue}
                min={min}
                max={max}
                onFocus={handleFocus}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            )
            : selectValue.map((value) => (
              <Marker
                value={value}
                min={min}
                max={max}
                onFocus={handleFocus}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))
          }

        </div>
        <div className={styles['count']}>
          <Track
            value={selectValue}
            min={min}
            max={max}
          />
        </div>
      </div>
    </Context.Provider>
  );
}

Scroller.propTypes = {
  step: types.number,
  min: types.number,
  max: types.number,
  value: types.array,
  onFocus: types.func,
  onChange: types.func,
  onBlur: types.func,
};

Scroller.defaultProps = {
  step: 1,
  value: [10],
  min: 0,
  max: 20,
  onFocus: null,
  onChange: null,
  onBlur: null,
};

export default Scroller;
