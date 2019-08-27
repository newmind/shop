
import { bindActionCreators } from 'redux';
import PageHOC from '@ui.packages/hocs';

import { openDialog, closeDialog } from '@ui.packages/dialog';

import Component from './Component';

import { getAll, create, updateById, deleteById } from '../ducks/commands';


const mapStateToProps = state => {
  const Category = state['Category'];
  return {
    categories: Category['categories'],
    inProcess: Category['inProcess'],
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    openDialog: bindActionCreators(openDialog, dispatch),
    closeDialog: bindActionCreators(closeDialog, dispatch),

    getAll: bindActionCreators(getAll, dispatch),
    create: bindActionCreators(create, dispatch),
    updateById: bindActionCreators(updateById, dispatch),
    deleteById: bindActionCreators(deleteById, dispatch),
  };
};

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: async ({ onLoading, getAll }) => {
    await getAll();
    onLoading(false);
  },
})(Component);