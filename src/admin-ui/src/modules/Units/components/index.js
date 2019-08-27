
import { bindActionCreators } from 'redux';
import PageHOC from '@ui.packages/hocs';

import { openDialog, closeDialog } from '@ui.packages/dialog';

import Component from './Component';

import { getUnits, createUnit, removeUnitById, updateUnitById } from '../ducks/commands';


const mapStateToProps = state => {
  const Units = state['Units'];
  return {
    units: Units['units'],
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    openDialog: bindActionCreators(openDialog, dispatch),
    closeDialog: bindActionCreators(closeDialog, dispatch),

    getUnits: bindActionCreators(getUnits, dispatch),
    createUnit: bindActionCreators(createUnit, dispatch),
    removeUnitById: bindActionCreators(removeUnitById, dispatch),
    updateUnitById: bindActionCreators(updateUnitById, dispatch),
  };
};

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: ({ onLoading, getUnits }) => {
    getUnits();
    onLoading(false);
  },
})(Component);