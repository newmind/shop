
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';


import Component from './Component';


const mapStateToProps = (state) => {
  return {
    values: getFormValues('order')(state),
  };
};


export default connect(
  mapStateToProps
)(Component);
