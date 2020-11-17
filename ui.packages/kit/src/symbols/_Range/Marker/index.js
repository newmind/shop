
import types from 'prop-types';
import React, { useEffect, useRef, useState, useContext } from 'react';

import Context from '../Context';

import styles from './default.module.scss';


const LEFT_BUTTON = 0;


function Marker({ value, min, max, onFocus, onChange, onBlur }) {
  const [ isChange, setChange ] = useState(true);
  const [ isStartMove, setStartMove ] = useState(false);
  const [ shiftX, setShiftX ] = useState(0);

  const wrapperRef = useRef(null);

  const { parentRef, getCoords, step } = useContext(Context);

  useEffect(function setEvents() {
    const { current: wrapperElement } = wrapperRef;
    const { current: parentElement } = parentRef;

    const parentCoords = getCoords(parentElement);
    const markerCoords = getCoords(wrapperElement);

    function handleMouseDown(event) {
      if (event['button'] === LEFT_BUTTON) {
        const wrapperCoords = getCoords(wrapperElement);

        setShiftX(event['pageX'] - wrapperCoords['left']);

        setStartMove(true);

        onFocus();
        event.stopPropagation();
      }
    }

    function handleMouseMove(event) {
      if ( ! isStartMove) {
        return void 0;
      }

      const dX = event['pageX'] - parentCoords['left'];
      const deltaValue = (dX / parentCoords['width']) * (max - min) + min

      if (Math.abs(deltaValue) >= step / 2) {
        if ((value === max && Math.sign(deltaValue) === 1) || (value === min && Math.sign(deltaValue) === -1)) return;
      }


      console.log(deltaValue, Math.abs(deltaValue), step / 2, Math.abs(deltaValue) >= step / 2)

      let newXPositionMarker =  event['pageX'] - parentCoords['left'] - shiftX;

      if (newXPositionMarker < 0) {
        newXPositionMarker = 0;
        setChange(false);
      }
      else if (newXPositionMarker > parentCoords['width'] - markerCoords['width'] - 2) {
        newXPositionMarker = parentCoords['width'] - markerCoords['width'] - 2;
        setChange(false);
      }
      else {
        setChange(true);
      }

      // if (isChange) {
      //   const value = Math.ceil((max - min) * newXPositionMarker / (parentCoords['width'] - markerCoords['width'] - 2) + min);
      //   onChange(value);
      // }
      wrapperElement.style.left = newXPositionMarker + 'px';
      event.preventDefault();
    }

    function handleMouseUp(event) {
      if (event['button'] === LEFT_BUTTON) {
        setStartMove(false);
        onBlur();
      }
    }

    wrapperElement.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {

      wrapperElement.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });

  useEffect(function setPositionByValue() {
    const { current: wrapperElement } = wrapperRef;
    const { current: parentElement } = parentRef;

    const parentCoords = getCoords(parentElement);
    const markerCoords = getCoords(wrapperElement);

    const posX = Math.ceil((value - min) * (parentCoords['width'] - markerCoords['width'] - 2) / max);

    wrapperElement.style.left = posX + 'px';
  }, [ value ]);

  return (
    <div ref={wrapperRef} className={styles['wrapper']}>
      <div className={styles['block']} />
      <div className={styles['arrow']} />
    </div>
  );
}

Marker.propTypes = {
  onFocus: types.func,
  onChange: types.func,
  onBlur: types.func,
};

Marker.defaultProps = {
  onFocus: null,
  onChange: null,
  onBlur: null,
};

export default Marker;
