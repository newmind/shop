
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isPristine, isValid, submit } from 'redux-form';

import Component from './Component';


const mapStateToProps = state => {
  const stock = state['stock'];
  return {
    stock: stock['stock'],
    products: stock['products'],
    currencies: stock['currencies'],
    categories: stock['categories'],
    inProcess: stock['inProcess'],
    isPristine: isPristine('add-stock-product')(state),
    isValid: isValid('add-stock-product')(state),
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