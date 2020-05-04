
import {closeDialog, openDialog} from "@ui.packages/dialog";

import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {replace} from "react-router-redux";

import Component from './Component';

import { pageInProcess, removeProductById } from "../../ducks/commands";


const mapStateToProps = (state) => ({
  items: state['products']['items'],
  meta: state['products']['meta'],
});

const mapActionsToProps = (dispatch) => {
  return {
    pageInProcess: bindActionCreators(pageInProcess, dispatch),

    openDialog: bindActionCreators(openDialog, dispatch),
    closeDialog: bindActionCreators(closeDialog, dispatch),

    replaceURI: bindActionCreators(replace, dispatch),
    removeProductById: bindActionCreators(removeProductById, dispatch),
  };
};


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
