
import { connect } from 'react-redux';

import Component from './Component';


const mapStateToProps = (state) => ({
  items: state['main']['types'],
});

const mapActionsToProps = () => ({});


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
