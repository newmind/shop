
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';


import Component from './Component';


const mapStateToProps = (state) => {
  return {
    values: getFormValues('recipe')(state),
  };
};

const mapActionsToProps = () => {
  return {};
};


export default connect(
  mapStateToProps,
  mapActionsToProps
)(Component);
