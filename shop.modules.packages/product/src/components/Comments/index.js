
import types from 'prop-types';
import React from 'react';

import Comment from './Comment';

import styles from './default.module.scss';


function Comments({ comments }) {
  return (
    <div className={styles['comments']}>
      {comments.map((comment, index) => <Comment key={index} {...comment} />)}
    </div>
  );
}

Comments.propTypes = {
  comments: types.array,
};

Comments.defaultProps = {
  comments: [],
};

export default Comments;
