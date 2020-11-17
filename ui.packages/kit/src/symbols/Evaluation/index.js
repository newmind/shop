
import types from 'prop-types';
import React, { useRef, useEffect } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


function Evaluation({ className, disabled, label, mode, size, type, value, onChange }) {
  function handleClick(index) {
    onChange && onChange(index);
  }

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
      <div className={styles['container']}>
        <div className={styles['evaluation']}>
          <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 1, 'far fa-star': value < 1 })} onClick={handleClick.bind(this, 1)} />
          <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 2, 'far fa-star': value < 2 })} onClick={handleClick.bind(this, 2)} />
          <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 3, 'far fa-star': value < 3 })} onClick={handleClick.bind(this, 3)} />
          <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 4, 'far fa-star': value < 4 })} onClick={handleClick.bind(this, 4)} />
          <span className={cn(styles['evaluation__star'], { 'fas fa-star': value >= 5, 'far fa-star': value < 5 })} onClick={handleClick.bind(this, 5)} />
        </div>
      </div>
    </div>
  );
}

Evaluation.propTypes = {
  className: types.string,
  label: types.string,
  mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
  value: types.oneOf([0, 1, 2, 3, 4, 5]),
  size: types.oneOf(['s', 'm', 'l']),
  disabled: types.bool,
  onChange: types.func,
};

Evaluation.defaultProps = {
  className: '',
  label: '',
  mode: 'default',
  value: 0,
  size: 'm',
  disabled: false,
};

export default Evaluation;
