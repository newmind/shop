
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    params: PropTypes.object,
  };

  _renderItem() {
    const { children } = this.props;

    return React.Children.map(children, (Item) => {
      const params = Item['props'];
      const { title, width, align } = params;
      const columnProps = {};

      if (width) {
        columnProps['width'] = Number(width) + 16;
      }

      const titleClassName = cn(styles['title'], {
        [styles['title--left']]: align === 'left',
        [styles['title--right']]: align === 'right',
      });

      return (
        <td className={styles['col']} {...columnProps}>
          <span className={titleClassName}>
            { title }
          </span>
        </td>
      );
    });
  }

  render() {
    return (
      <thead className={styles['header']}>
        <tr className={styles['row']}>
          { this._renderItem() }
        </tr>
      </thead>
    );
  }
}


export default Component;