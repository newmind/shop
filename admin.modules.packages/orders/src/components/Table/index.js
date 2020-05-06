
import { connect } from 'react-redux';

import Component from './Component';


const mapStateToProps = (state) => ({
  items: state['orders']['items'],
});


export default connect(
  mapStateToProps
)(Component);
