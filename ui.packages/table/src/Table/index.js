
import React from 'react';
import types from 'prop-types';

import Row from '../Row';
import Header from '../Header';
import Column from '../Column';

import styles from './default.module.scss';


function Table({ columns, children }) {
  return (
    <div className={styles['wrapper']}>
      <table className={styles['table']}>
        <Header>{ children }</Header>
        { ! columns.length && (
          <caption className={styles['empty']}>
            <span className={styles['message']}>Нет данных для отображения</span>
          </caption>
        )}
        {columns.map((item, index) => (
          <Row key={index} data={item}>
            { children }
          </Row>
        ))}
      </table>
    </div>
  );
}

Table.propTypes = {
  columns: types.array,
  children: types.any,
};

Table.defaultProps = {
  columns: [],
  children: Column,
};

export default Table;
