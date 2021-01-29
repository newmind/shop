
import React from 'react';
import types from 'prop-types';

import styles from './default.module.scss';


function Row({ useSub, subTemplate, children, data }) {
  const count = React.Children.count(children);

  return (
    <tbody className={styles['row']}>
      <tr className={styles['line']}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            _model: data
          });
        })}
      </tr>
      {useSub && subTemplate && (
        <tr className={styles['line']}>
          <td colSpan={count}>
            {subTemplate(data)}
          </td>
        </tr>
      )}
    </tbody>
  );
}

Row.propTypes = {
  useSub: types.bool,
  subTemplate: types.func,
  children: types.node,
  data: types.object,
};

Row.defaultProps = {
  useSub: false,
  subTemplate: null,
  data: null,
  children: null,
};

export default Row;
