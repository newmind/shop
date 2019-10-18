
import types from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { NavLink } from "react-router-dom";

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    items: types.array,
  };

  static defaultProps = {
    items: [],
  };

  render() {
    const { items } = this.props;
    const count = items.length - 1;
    return (
      <div className={styles['breadcrumbs']}>
        {items.map((item, index) => {
          return (
            <Fragment key={index}>
              <span key={`item.${index}`} className={styles['breadcrumbs__item']}>
                {item['href']
                  ? <NavLink className={styles['breadcrumbs__link']} to={'/'}>{ item['title'] }</NavLink>
                  : <span className={styles['breadcrumbs__title']}>{ item['title'] }</span>}
              </span>
              {(index < count) && (
                <span key={`delimiter.${index}`} className={styles['breadcrumbs__item']}>
                  <span className={styles['breadcrumbs__delimiter']}>{'/'}</span>
                </span>
              )}
            </Fragment>
          );
        })}
      </div>
    );
  }
}

export default Component;
