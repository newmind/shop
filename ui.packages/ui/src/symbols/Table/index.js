
import types from 'prop-types';
import React, { PureComponent } from 'react';

import CheckBox from '../CheckBox';

import cn from 'classnames';
import styles from './default.module.scss';

// const PRIMARY_MODE = 'primary';
// const INFO_MODE = 'info';
// const WARNING_MODE = 'warning';
// const DANGER_MODE = 'danger';
// const SUCCESS_MODE = 'success';


class Header extends PureComponent {
  render() {
    const { title, attrs = {} } = this.props;
    const { width = 'auto', align = 'left' } = attrs;
    const titleClassName = cn(styles['table__title'], {
      [styles['table__title--right']]: align === 'right',
      [styles['table__title--center']]: align === 'center',
    });
    return (
      <td style={{ width }}>
        {title && <span className={titleClassName}>{ title }</span>}
      </td>
    );
  }
}

class Column extends PureComponent {
  static propTypes = {
    data: types.any,
    template: types.func,
    transform: types.func,
  };

  static defaultProps = {
    data: null,
  };

  render() {
    const { data, template, transform, attrs = {}} = this.props;
    const { align = 'left', vAlign = 'top' } = attrs;
    const colClassName = cn(styles['table__col'], {
      [styles['table__col--right']]: align === 'right',
      [styles['table__col--center']]: align === 'center',
    });
    return (
      <td style={{ verticalAlign: vAlign }}>
        {template
          ? template(data)
          : <span className={colClassName}>{ transform ? transform(data) : data }</span>}
      </td>
    );
  }
}

class Line extends PureComponent {
  static propTypes = {
    columns: types.array,
    model: types.object,
  };

  static defaultProps = {
    columns: [],
    model: {},
  };

  render() {
    const { useCheck, columns, model } = this.props;
    return (
      <tr className={styles['table__row']}>
        {useCheck && (
          <td style={{ width: '40px', textAlign: 'center', verticalAlign: 'middle', fontSize: 0 }}>
            <CheckBox />
          </td>
        )}
        {columns.map((column, key) => {

          const alias = column['alias'] || null;
          const data = alias ? model[alias] : model;

          return <Column key={key} data={data} {...column} />
        })}
      </tr>
    );
  }
}


class Component extends PureComponent {
  static propTypes = {
    className: types.string,
    items: types.array,
    columns: types.array,
    empty: types.string,
    useCheck: types.bool,
  };

  static defaultProps = {
    className: '',
    items: [],
    columns: [],
    empty: 'Нет данных',
    useCheck: false,
  };

  render() {
    const { className, items, columns, empty, useCheck } = this.props;
    const tableClassName = cn(styles['table'], className);
    return (
      <div className={styles['wrapper']}>
        <table className={tableClassName}>
          <thead className={styles['table__thead']}>
            <tr>
              {useCheck && (
                <td style={{ width: '40px', textAlign: 'center', verticalAlign: 'middle', fontSize: 0 }}>
                  <CheckBox />
                </td>
              )}
              {columns.map((column, key) => <Header key={key} {...column} />)}
            </tr>
          </thead>
          <tbody>
            { items.map((item, key) => <Line key={key} useCheck={useCheck} columns={columns} model={item} />) }
          </tbody>
          { ! items['length'] && (
            <caption className={styles['table__caption']}>{ empty }</caption>
          )}
        </table>
      </div>
    );
  }
}

export default Component;
