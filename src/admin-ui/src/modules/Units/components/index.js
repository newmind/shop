
import { bindActionCreators } from 'redux';
import PageHOC from '../../_bin/PageHOC';

import { openDialog, closeDialog } from '@packages/dialog';

import Component from './Component';

import { getUnits, createUnit } from '../ducks/commands';


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
  };
};

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: ({ onLoading, getUnits }) => {
    getUnits();
    onLoading(false);
  },
  onDestroy: () => {},
})(Component);