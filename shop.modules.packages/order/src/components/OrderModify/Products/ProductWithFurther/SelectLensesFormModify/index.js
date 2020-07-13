
import { connect } from 'react-redux';

import Component from './Component';


const mapStateToProps = (state) => {
  const Order = state['order'];
  return {
    lenses: Order['lenses'],
  };
};

const mapActionToProps = () => ({});

export default connect(
  mapStateToProps,
  mapActionToProps,
)(Component);
