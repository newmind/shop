
import types from "prop-types";
import React, {Component as PureComponent} from "react";

import cn from "classnames";
import styles from "./default.module.scss";


class Component extends PureComponent {
  static propTypes = {
    number: types.number,
    onChange: types.func,
  };

  static defaultProps = {
    number: new Date().getFullYear(),
  };

  _handlePrevClick() {
    const { number, onChange } = this.props;
    let prevNumber = number - 1;
    onChange(prevNumber);
  }

  _handleNextClick() {
    const { number, onChange } = this.props;
    let nextNumber = number + 1;
    onChange(nextNumber);
  }

  render() {
    const { number } = this.props;
    const prevClassName = cn(styles['year__prev'], 'fas fa-caret-left');
    const nextClassName = cn(styles['year__next'], 'fas fa-caret-right');
    return (
      <div className={styles['year']}>
        <span className={prevClassName} onClick={this._handlePrevClick.bind(this)} />
        <span className={styles['year__value']}>{ number }</span>
        <span className={nextClassName} onClick={this._handleNextClick.bind(this)} />
      </div>
    );
  }
}

export default Component;
