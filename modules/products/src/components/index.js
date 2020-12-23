
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from './Component';

import {
  getProducts,
  createProducts,
} from '../ducks/commands';


const mapStateToProps = () => {
  return {};
};

const mapActionsToProps = (dispatch) => {
  return {
    getProducts: bindActionCreators(getProducts, dispatch),
    createProducts: bindActionCreators(createProducts, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
