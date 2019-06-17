
import { bindActionCreators } from 'redux';
import PageHOC from '../../_bin/PageHOC';

import { openDialog, closeDialog } from '@packages/dialog';

import Component from './Component';

import {
  getAll,
  create,
  updateById,
  deleteById,
} from '../ducks/commands';


const mapStateToProps = state => {
  const Currency = state['Currency'];
  return {
    currencies: Currency['currencies'],
    inProcess: Currency['inProcess'],
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
  onDestroy: () => {},
})(Component);