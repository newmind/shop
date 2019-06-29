
import types from 'prop-types';
import React, { PureComponent } from 'react';

import moment from '@packages/moment';
import { Evaluation } from '@packages/ui';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    comments: types.array,
  };

  static defaultProps = {
    comments: [],
  };

  render() {
    const { comments } = this.props;
    return (
      <div className={styles['comments']}>
        {comments.map((comment, index) => (
          <div key={index} className={styles['comment']}>
            <div className={styles['comment__header']}>
              <div className={styles['comment__evaluation']}>
                <Evaluation mode="info" value={comment['evaluation']} />
              </div>
              <div className={styles['comment__wrapper']}>
                <span className={styles['comment__person']}>{ comment['person'] }</span>
                <span className={styles['comment__date']}>( { moment(comment['comment__date']).format('DD.MM.YYYY') } )</span>
              </div>
            </div>
            <div className={styles['comment__content']}>
              { comment['comment'] }
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Component;
