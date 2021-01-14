
import { Mode, Size } from '@ui.packages/types';
import { Header, Button } from '@ui.packages/kit';
import { Dialog, openDialog, closeDialog } from '@ui.packages/dialog';

import React from 'react';
import types from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Comment from './Comment';
import CommentModify from './CommentModify';

import styles from './default.module.scss';

import { selectProduct } from '../../ducks/slice';
import { createComment } from '../../ducks/commands';


function Comments({ comments }) {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);

  function handleOpenCommentDialog() {
    dispatch(openDialog('comment'));
  }

  function handleCreateComment(formData) {
    dispatch(createComment(product['uuid'], formData));
    dispatch(closeDialog('comment'));
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['aside']}>
        <div className={styles['header']}>
          <Header level={4}>Оставлено {comments.length} отзывов</Header>
        </div>
        <div className={styles['controls']}>
          <Button
            mode={Mode.PRIMARY}
            size={Size.SMALL}
            onClick={() => handleOpenCommentDialog()}
          >Оставить отзыв</Button>
        </div>
      </div>
      { !! comments.length && (
        <div className={styles['content']}>
          {comments.map((comment, index) => <Comment key={index} {...comment} />)}
        </div>
      )}

      <Dialog name="comment" title="Ваш отзыв о товаре">
        <CommentModify onSubmit={(data) => handleCreateComment(data)} />
      </Dialog>
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
