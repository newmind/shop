
import { connect } from 'react-redux';

import Component from './Component';


const mapStateToProps = (state) => {
  return {
    products: state['details-order']['products'],
  };
};

const mapActionsToProps = () => ({
});


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
