
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
    onChange: types.func,
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
    const { year, month, date } = this.props;

    const today = moment();
    const days = this._calculateDates();

    return (
      <div className={styles['board']}>
        {days.map((week, weekKey) => (
          <div key={weekKey} className={styles['board__week']}>
            {week.map((day, dayKey) => {

              const isToday = moment({ year, month, date: day }).isSame(today,'date');
              const isWeekend = day && [6, 7].indexOf(moment({ year, month, date: day }).isoWeekday()) > -1;
              const isSelected = typeof day === 'number' && moment({ year, month, date: day }).isSame({ year, month, date }, 'date');

              const dayClassName = cn(styles['board__day'], {
                [styles['board__day--today']]: isToday,
                [styles['board__day--weekend']]: isWeekend,
                [styles['board__day--selected']]: isSelected,
              });
              return (
                <div key={dayKey} className={dayClassName} onClick={this._handleCheckDay.bind(this, day)}>{ day }</div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}

export default Component;