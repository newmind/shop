
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFormValues, change } from 'redux-form';


import Component from './Component';


const mapStateToProps = (state) => {
  return {
    values: getFormValues('recipe')(state),
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    onChange: bindActionCreators(change, dispatch),
  };
};


export default connect(
  mapStateToProps,
  mapActionsToProps
)(Component);
