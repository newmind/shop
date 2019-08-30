
import types from 'prop-types';
import React, { PureComponent } from 'react';

import moment from '@ui.packages/moment';

import Months from "../Months";
import Years from "../Years";
import Days from "../Days";

import cn from "classnames";
import styles from "./default.module.scss";


class Component extends PureComponent {
  static propTypes = {
    value: types.any,
    minDate: types.any,
    maxDate: types.any,
    onChange: types.func,
  };

  static defaultProps = {
    value: null,
    minDate: null,
    maxDate: null,
  };

  constructor(...props) {
    super(...props);

    const { value } = this.props;
    const current = value ? moment(value) : moment();

    this.state = {
      year: current.year(),
      month: current.month(),
      date: value && current.date(),
    };
  }

  _handleChangeYear(year) {
    this.setState({ year });
  }

  _handleChangePrevMonth() {
    const { year, month } = this.state;
    let prevMonth = month - 1;
    let prevYear = year;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear = prevYear - 1;
    }
    this.setState({ year: prevYear, month: prevMonth });
  }

  _handleChangeNextMonth() {
    const { year, month } = this.state;
    let nextMonth = month + 1;
    let nextYear = year;
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear = nextYear + 1;
    }
    this.setState({ year: nextYear, month: nextMonth });
  }

  _handleChangeDate(date) {
    const { onChange } = this.props;
    this.setState({ date }, () => onChange(moment(this.state)));
  }

  render() {
    const { minDate, maxDate } = this.props;
    const { year, month, date } = this.state;

    const prevClassName = cn(styles['month__prev'], 'fas fa-caret-left');
    const nextClassName = cn(styles['month__next'], 'fas fa-caret-right');

    return (
      <div className={styles['dashboard']}>
        <div className={styles['dashboard__header']}>
          <div className={styles['dashboard__left']} onClick={this._handleChangePrevMonth.bind(this)}>
            <span className={prevClassName} />
          </div>
          <div className={styles['dashboard__center']}>
            <Months number={month} />
            <Years number={year} onChange={this._handleChangeYear.bind(this)} />
          </div>
          <div className={styles['dashboard__right']} onClick={this._handleChangeNextMonth.bind(this)}>
            <span className={nextClassName} />
          </div>
        </div>
        <div className={styles['dashboard__content']}>
          <Days date={date} year={year} month={month} minDate={minDate} maxDate={maxDate} onChange={this._handleChangeDate.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Component;
