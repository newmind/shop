
import { Header } from '@ui.packages/kit';

import React from 'react';

import Table from './Table';

import styles from './default.module.scss';


function Comments() {
  // async _handleUpdate(formData) {
  //   const { updateComment, closeDialog } = this.props;
  //
  //   await updateComment(formData);
  //   closeDialog('remove-confirm');
  // }

  // async _handleEditComment(id) {
  //   const { getComment, openDialog } = this.props;
  //   const comment = await getComment(id);
  //
  //   this.setState({ comment }, () => openDialog('comment-modify'));
  // }

  return (
    <section className={styles['wrapper']}>
      <header className={styles['header']}>
        <Header level={1}>Комментарии</Header>
      </header>
      <article className={styles['content']}>
        <Table />
      </article>

      {/*<Dialog title="Редактировать комментарий" name="comment-modify">*/}
        {/*<FormModify initialValues={comment} onSubmit={this._handleUpdate.bind(this)} />*/}
      {/*</Dialog>*/}
    </section>
  );
}

Comments.propTypes = {};

Comments.defaultProps = {};

export default Comments;
