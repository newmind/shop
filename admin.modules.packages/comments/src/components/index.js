
import PageHOC from '@ui.packages/hocs';

import { bindActionCreators } from 'redux';

import Component from './Component';

import { openDialog, closeDialog } from '@ui.packages/dialog';

import {
  pageInProcess,

  getComments,
  deleteComments,
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
  deleteComments,
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