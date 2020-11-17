
import types from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';


import styles from './default.module.scss';


function translate(element, x, index) {
  element.style.transform = `translate(${x}px)`;
  element.style.zIndex = index;
}

function translateThumbs(thumbs, offsets) {
  return thumbs.forEach((element, index) => translate(element, offsets[index]['x'], index));
}

function getThumbs(parent) {
  if (parent) {
    return Array.from(parent['children']).filter((element) => element.hasAttribute('aria-valuenow'));
  }
  return [];
}

function getCoords(element) {
  const rect = element.getBoundingClientRect();
  return {
    right: rect['right'],
    left: rect['left'],
    width: rect['width'],
  };
}

function getThumbDistance(thumbEl, clientX) {
  const { x, width } = thumbEl.getBoundingClientRect();
  return Math.abs(clientX - (x + width / 2));
}

// function getClosestThumbIndex(thumbs, clientX) {
//   let thumbIndex = 0
//   let minThumbDistance = getThumbDistance(thumbs[0], clientX);
//   for (let i = 1; i < thumbs.length; i++) {
//     const thumbDistance = getThumbDistance(thumbs[i], clientX);
//     if (thumbDistance < minThumbDistance) {
//       minThumbDistance = thumbDistance;
//       thumbIndex = i;
//     }
//   }
//   return thumbIndex;
// }

function getStepDecimals(step) {
  const decimals = step.toString().split('.')[1];
  return decimals ? decimals.length : 0;
}

function normalizeValue(value, index, min, max, step) {
  const BIG_NUM = 10e10;
  value = Math.round(value * BIG_NUM) / BIG_NUM;

  if (value > max) {
    return max;
  }
  if (value < min) {
    return min;
  }

  const remainder = Math.floor(value * BIG_NUM - min * BIG_NUM) % Math.floor(step * BIG_NUM);
  const closestLowerNum = Math.floor(value * BIG_NUM - Math.abs(remainder));
  const rounded = remainder === 0 ? value : closestLowerNum / BIG_NUM;
  const res = (Math.abs(remainder / BIG_NUM) < step / 2) ? rounded : rounded + step;
  const decimalPlaces = getStepDecimals(step);

  return parseFloat(res.toFixed(decimalPlaces));
}

function relativeValue(value, min, max) {
  return (value - min) / (max - min);
}


function Range({ step, value, min, max, onFocus, onChange, onBlur }) {
  const trackRef = useRef(null);
  const thumbRefs = value.map(() => useRef(null));
  const [ activeThumbIndex, setActiveThumbIndex ] = useState(-1);

  function getTargetIndex(event) {
    return getThumbs(trackRef['current']).findIndex((child) => child === event['target'] || child.contains(event['target']));
  }

  function getOffsets(trackElement) {
    const trackCoords = getCoords(trackElement);

    return thumbRefs.map((thumbRef, index) => {
      const thumbOffsets = { x: 0 };
      const thumbCoords = getCoords(thumbRef['current']);

      thumbOffsets['x'] = trackCoords['width'] * relativeValue(value[index], min, max) - thumbCoords['width'] / 2;

      return thumbOffsets;
    });
  }

  function handleThumbMove(clientX) {
    if (activeThumbIndex === -1) return void 0;

    const trackCoords = getCoords(trackRef['current']);
    let newValue = ((clientX - trackCoords['left']) / trackCoords['width']) * (max - min) + min;

    if (Math.abs(value[activeThumbIndex] - newValue) >= step / 2) {
      if (newValue >= max) {
        newValue = max;
      }
      else if (newValue <= min) {
        newValue = min;
      }
      else if (value[activeThumbIndex + 1] && newValue > value[activeThumbIndex + 1]) {
        newValue = value[activeThumbIndex + 1];
      }
      else if (value[activeThumbIndex - 1] && newValue < value[activeThumbIndex - 1]) {
        newValue = value[activeThumbIndex - 1];
      }
    }

    const newValues = value.slice(0);
    newValues[activeThumbIndex] = normalizeValue(newValue, activeThumbIndex, min, max, step);

    onChange && onChange(newValues);
  }

  function handleMouseDown(event) {
    if (event['button'] !== 0) return void 0;

    event.preventDefault();
    event.stopPropagation();

    setActiveThumbIndex(getTargetIndex(event));

    // const draggedThumbIndex = getClosestThumbIndex(thumbRefs.map((thumbRef) => thumbRef['current']), event['clientX']);
    //
    // thumbRefs[draggedThumbIndex]['current'].focus();
    //
    // setActiveThumbIndex(draggedThumbIndex);
    // handleThumbMove(event['clientX']);
  }

  function handleMouseMove(event) {
    event.preventDefault();
    event.stopPropagation();

    handleThumbMove(event['clientX']);
  }

  function handleMouseUp(event) {
    event.preventDefault();

    setActiveThumbIndex(-1);
  }


  useEffect(function mountEvents() {
    const trackElement = trackRef['current'];

    translateThumbs(getThumbs(trackElement), getOffsets(trackElement));

    thumbRefs.map((thumbRef) => thumbRef['current'].addEventListener('mousedown', handleMouseDown));
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return function unmountEvents() {

      thumbRefs.map((thumbRef) => thumbRef['current'].removeEventListener('mousedown', handleMouseDown));
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseDown);
    }
  });

  return (
    <div className={styles['wrapper']}>
      <div className={styles['container']}>
        <div ref={trackRef} className={styles['track']}>
          {value.map((val, index) => (
            <div ref={thumbRefs[index]} key={index} className={styles['thumb']} aria-valuenow={value[index]}>
              <div className={styles['block']} />
              <div className={styles['arrow']} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Range.propTypes = {
  step: types.number,
  min: types.number,
  max: types.number,
  value: types.array,
  onFocus: types.func,
  onChange: types.func,
  onBlur: types.func,
};

Range.defaultProps = {
  value: [],
  min: 0,
  max: 10,
  step: 1,
  onFocus: null,
  onChange: null,
  onBlur: null,
};

export default Range;
