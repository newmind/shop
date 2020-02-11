
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import Row from '../Row';
import Header from '../Header';
import Column from '../Column';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    _data: PropTypes.string,
    columns: PropTypes.array,
    children: PropTypes.any,
  };

  static defaultProps = {
    columns: [],
    children: Column,
  };



  render() {
    const { columns, children } = this.props;

    return (
      <div className={styles['wrapper']}>
        <table className={styles['table']}>
          <Header>{ children }</Header>
          {columns.map((item, index) => (
            <Row key={index} data={item}>
              { children }
            </Row>
          ))}
        </table>
      </div>
    );
  }
}


export default Component;