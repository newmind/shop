
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isPristine, isValid, submit } from 'redux-form';

import Component from './Component';


const mapStateToProps = state => {
  const Category = state['categories'];
  return {
    inProcess: Category['inProcess'],
    isPristine: isPristine('modify-category')(state),
    isValid: isValid('modify-category')(state),
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    submit: bindActionCreators(submit, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);