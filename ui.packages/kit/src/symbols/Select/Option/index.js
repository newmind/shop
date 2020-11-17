
import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Option(props) {
  const { value, option, optionKey, optionValue, onCheck, optionTransform, optionTemplate } = props;

  function getValue(value) {
    if (value instanceof Object) {
      if (optionTransform) {
        return optionTransform(value);
      }
      return value[optionValue];
    } else {
      return value;
    }
  }

  function getKey(value) {
    if (value instanceof Object) {
      return value[optionKey];
    } else {
      return value;
    }
  }

  const classNameOption = cn(styles['option'], {
    [styles['option--selected']]: getKey(value) === getKey(option),
  });

  return (
    <span className={classNameOption} onClick={() => onCheck(option)}>
      {optionTemplate
        ? optionTemplate(option)
        : <span className={styles['option__value']}>{ getValue(option) }</span>}
    </span>
  );
}

export default Option;
