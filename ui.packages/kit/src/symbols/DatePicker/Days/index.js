
import types from "prop-types";
import React, {Component as PureComponent} from "react";

import moment from '@ui.packages/moment';

import { reduceToArray } from "@ui.packages/utils";

import cn from 'classnames';
import styles from "./default.module.scss";


const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];


class Component extends PureComponent {
  static propTypes = {
    year: types.number,
    month: types.number,
    date: types.number,
    minDate: types.any,
    maxDate: types.any,
    onChange: types.func,
  };

  static defaultProps = {
    year: null,
    month: null,
    date: null,
    minDate: null,
    maxDate: null,
  };

  _calculateDates() {
    const { year, month } = this.props;

    const value = moment({ year, month });

    const lastDay = value.endOf('month').date();

    const weekDayOfLastDayOfMonth = value.endOf('month').day();
    const weekDayOfFirstDayOfMonth = value.startOf('month').day();

    const squares = [];

    squares.push(...days);

    if (weekDayOfFirstDayOfMonth !== 0) {
      for(let  i = 1; i < weekDayOfFirstDayOfMonth; i++) {
        squares.push(null);
      }
    } else {
      for(let i = 0; i < 6; i++) {
        squares.push(null);
      }
    }

    for(let i = 1; i <= lastDay; i++) {
      squares.push(i);
    }

    if (weekDayOfLastDayOfMonth !== 0) {
      for(let i = weekDayOfLastDayOfMonth; i < 7; i++) {
        squares.push(null);
      }
    }

    return reduceToArray(squares, 7);
  }

  _handleCheckDay(date) {
    const { onChange } = this.props;
    if (typeof date === 'number') {
      onChange(date);
    }
  }

  render() {
    const { year, month, date, minDate, maxDate } = this.props;

    const today = moment();
    const days = this._calculateDates();

    return (
      <div className={styles['board']}>
        {days.map((week, weekKey) => (
          <div key={weekKey} className={styles['board__week']}>
            {week.map((day, dayKey) => {

              const isToday = moment({ year, month, date: day }).isSame(today,'date');
              const isWeekend = [5, 6].indexOf(dayKey) > -1;
              const isSelected = (typeof day === 'number') && date && moment({ year, month, date: day }).isSame({ year, month, date }, 'date');
              const isDisabledBefore = maxDate && moment({ year, month, date: day }).isBefore(maxDate, 'date');
              const isDisabledAfter = minDate && moment({ year, month, date: day }).isAfter(minDate, 'date');

              const dayClassName = cn(styles['board__day'], {
                [styles['board__day--today']]: isToday,
                [styles['board__day--weekend']]: isWeekend,
                [styles['board__day--selected']]: isSelected,
                [styles['board__day--disabled']]: isDisabledBefore || isDisabledAfter,
              });
              return (
                <div key={dayKey} className={dayClassName} onClick={this._handleCheckDay.bind(this, ! (isDisabledBefore || isDisabledAfter) && day)}>{ day }</div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}

export default Component;