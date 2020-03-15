
import PageHOC from '@ui.packages/hocs';
import { openDialog, closeDialog } from '@ui.packages/dialog';

import { bindActionCreators } from 'redux';

import Component from './Component';

import {
  pageInProcess,

  getComments,
  getComment,
  deleteComments,
  updateComment,
} from '../ducks/commands';


const mapStateToProps = state => {
  const Comments = state['comments'];

  return {
    items: Comments['items'],
  };
};

const mapActionsToProps = (dispatch) => bindActionCreators({
  pageInProcess,

  openDialog,
  closeDialog,

  getComments,
  getComment,
  deleteComments,
  updateComment,
}, dispatch);


export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: async ({ pageInProcess, getComments }) => {
    pageInProcess(false);
    await getComments();
    pageInProcess(false);
  },
})(Component);