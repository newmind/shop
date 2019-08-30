
import React, { PureComponent } from "react";
import types from "prop-types";

import styles from "./default.module.scss";

const weeks = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];


class Component extends PureComponent {
  static propTypes = {
    number: types.number,
  };

  static defaultProps = {
    number: 0,
  };

  render() {
    const { number } = this.props;
    return (
      <div className={styles['month']}>
        <span className={styles['month__value']}>{ weeks[number] }</span>
      </div>
    );
  }
}

export default Component;