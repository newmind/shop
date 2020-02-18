
import types from 'prop-types';
import React, { PureComponent } from 'react';

import moment from '@ui.packages/moment';
import { Evaluation } from '@ui.packages/ui';

import cn from 'classnames';
import styles from './default.module.scss';


class Comment extends PureComponent {
  static propTypes = {
    evaluation: types.number,
    person: types.string,
    createdAt: types.string,
    comment: types.string,
  };

  static defaultProps = {
    evaluation: 0,
    person: '',
    createdAt: '',
    comment: '',
  };

  render() {
    const { evaluation, person, comment, createdAt } = this.props;
    const commentClassName = cn(styles['comment'], {
      [styles['comment--good']]: evaluation === 5,
      [styles['comment--medium']]: evaluation > 1 && evaluation < 5,
      [styles['comment--bad']]: evaluation === 1,
    });
    let mode = 'default';

    if (evaluation === 1) {
      mode = 'danger';
    }
    else if (evaluation > 1 && evaluation < 5) {
      mode = 'info';
    }
    else if (evaluation === 5) {
      mode = 'success';
    }

    return (
      <div className={commentClassName}>
        <div className={styles['comment__header']}>
          <div className={styles['comment__wrapper']}>
            <span className={styles['comment__person']}>{ person }</span>
            <span className={styles['comment__date']}>({ moment(createdAt).format('DD.MM.YYYY HH:mm') })</span>
          </div>
          <div className={styles['comment__evaluation']}>
            <Evaluation mode={mode} size="s" value={ evaluation } />
          </div>
        </div>
        <div className={styles['comment__content']}>
          { comment }
        </div>
      </div>
    );
  }
}


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
        {comments.map((comment, index) => <Comment key={index} {...comment} />)}
      </div>
    );
  }
}

export default Component;
