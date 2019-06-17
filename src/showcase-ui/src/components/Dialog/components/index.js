
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Component from './Component';

import { closeDialog } from '../ducks/commands';


const mapStateToProps = state => ({
  isOpen: state['dialog']['isOpen']
});

const mapActionsToProps = (dispatch) => {
  return {
    closeDialog: bindActionCreators(closeDialog, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);