
import moment from '@ui.packages/moment';
import { Evaluation } from '@ui.packages/kit';

import types from 'prop-types';
import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Comment({ evaluation, person, comment, createdAt }) {
  let mode = 'default';
  const commentClassName = cn(styles['comment'], {
    [styles['comment--good']]: evaluation === 5,
    [styles['comment--medium']]: evaluation > 1 && evaluation < 5,
    [styles['comment--bad']]: evaluation === 1,
  });

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
      <div className={styles['header']}>
        <div className={styles['wrapper']}>
          <span className={styles['person']}>{ person }</span>
          <span className={styles['date']}>({ moment(createdAt).format('DD.MM.YYYY HH:mm') })</span>
        </div>
        <div className={styles['evaluation']}>
          <Evaluation mode={mode} size="s" value={ evaluation } />
        </div>
      </div>
      <div className={styles['content']}>
        { comment }
      </div>
    </div>
  );
}

Comment.propTypes = {
  evaluation: types.number,
  person: types.string,
  createdAt: types.string,
  comment: types.string,
};

Comment.defaultProps = {
  evaluation: 0,
  person: '',
  createdAt: '',
  comment: '',
};

export default Comment;
