
import types from 'prop-types';
import React, { PureComponent } from 'react';

import moment from '@packages/moment';
import { Evaluation } from '@packages/ui';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
  };

  static defaultProps = {
  };

  render() {
    const {} = this.props;
    return (
      <div className={styles['comments']}>
        <Evaluation />
      </div>
    );
  }
}

export default Component;
