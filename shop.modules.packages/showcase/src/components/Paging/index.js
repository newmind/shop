
import { connect } from 'react-redux';

import Component from './Component';


const mapStateToProps = (state) => ({
  items: state['showcase']['items'],
  meta: state['showcase']['meta'],
});

const mapActionsToProps = () => ({});


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
