
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    alias: PropTypes.string,
    title: PropTypes.string,
    width: PropTypes.string,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    empty: PropTypes.any,
    children: PropTypes.any,
    _model: PropTypes.object,
    transform: PropTypes.func,
  };

  static defaultProps = {
    alias: null,
    title: null,
    empty: null,
    width: null,
    align: 'center',
    children: null,
    _model: null,
    transform: null,
  };

  _renderData() {
    const { alias, empty, transform, _model, children } = this.props;
    let model = (alias ? _model[alias] : _model) || empty;

    if (model && (transform instanceof Function)) {
      model = transform(model);
    }

    if (model || model === null) {
      if (children instanceof Function) {
        return children(model) || empty;
      }
      else {
        if (model !== null && (model instanceof Object)) {
          if (children) {
            return React.cloneElement(children, model);
          }
          else {
            return null;
          }
        }
        else {
          if (children) {
            return React.cloneElement(children, { value: model });
          }
          else {
            return model;
          }
        }
      }
    }
    else {
      return null;
    }
  }

  render() {
    const { align } = this.props;
    const contentClassName = cn(styles['content'], {
      [styles['content--left']]: align === 'left',
      [styles['content--right']]: align === 'right',
    });

    return (
      <td className={styles['col']}>
        <span className={contentClassName}>
          { this._renderData() }
        </span>
      </td>
    );
  }
}


export default Component;