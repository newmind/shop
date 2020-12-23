
import { closeDialog, openDialog } from "@ui.packages/dialog";

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import Component from './Component';

import { removeProductById } from "../../ducks/commands";


const mapStateToProps = (state) => ({
  items: state['products']['items'],
  meta: state['products']['meta'],
});

const mapActionsToProps = (dispatch) => {
  return {
    openDialog: bindActionCreators(openDialog, dispatch),
    closeDialog: bindActionCreators(closeDialog, dispatch),

    removeProductById: bindActionCreators(removeProductById, dispatch),
  };
};


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
