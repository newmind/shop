
import { connect } from 'react-redux';

import Component from './Component';


const take = process.env['REACT_APP_TAKE'];


const mapStateToProps = (state) => ({
  page: Number(state['showcase']['paging']['page'] || 1),
  pages: Number(Math.ceil(state['showcase']['meta']['total'] / take) || 0),
});

const mapActionsToProps = () => ({});


export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
