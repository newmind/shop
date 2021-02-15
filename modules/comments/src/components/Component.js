
import { Header, Page, PageContent } from '@ui.packages/kit';

import React from 'react';
import { useSelector } from 'react-redux';

import Table from './Table';

import styles from './default.module.scss';

import { selectInProcess } from '../ducks/slice';


function Comments() {
  const inProcess = useSelector(selectInProcess);

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
    <Page inProcess={inProcess}>
      <PageContent>
        <header className={styles['header']}>
          <Header level={1}>Комментарии</Header>
        </header>
        <div className={styles['content']}>
          <Table />
        </div>
      </PageContent>

      {/*<Dialog title="Редактировать комментарий" name="comment-modify">*/}
        {/*<FormModify initialValues={comment} onSubmit={this._handleUpdate.bind(this)} />*/}
      {/*</Dialog>*/}
    </Page>
  );
}

Comments.propTypes = {};

Comments.defaultProps = {};

export default Comments;
