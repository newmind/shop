
import types from 'prop-types';
import React, { PureComponent } from "react";

import styles from "./default.module.scss";


class Component extends PureComponent {
  static propTypes = {
    items: types.array,
    meta: types.object,
    onGetMore: types.func,
  };

  static defaultProps = {
    items: [],
    meta: {},
  };

  render() {
    const { items, meta, onGetMore } = this.props;
    const rest = meta['total'] - items.length;
    const take = process.env['REACT_APP_TAKE'];
    const isLastPart = rest < take;
    return (
      (items.length < meta['total']) && (
        <button className={styles['more']} type="button" onClick={onGetMore.bind(this)}>Показать еще {isLastPart ? rest : take} из {meta['total']}</button>
      )
    );
  }
}

export default Component;
