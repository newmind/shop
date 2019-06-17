
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Component from './Component';


export default withRouter(connect()(Component));
