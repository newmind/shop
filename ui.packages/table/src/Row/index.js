
import PropTypes from 'prop-types';
import React from 'react';

import styles from './default.module.scss';


function Row({ children, data }) {
  return (
    <tbody className={styles['row']}>
      <tr className={styles['line']}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            _model: data
          });
        })}
      </tr>
    </tbody>
  );
}

Row.propTypes = {
  children: PropTypes.node,
  data: PropTypes.object,
};

Row.defaultProps = {
  data: null,
};

export default Row;
