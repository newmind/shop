
import { connect } from 'react-redux';

import Component from './Component';


const mapStoreToAction = (store) => ({
  inProcess: store['page']['inProcess'],
});

const mapActionsToProps = () => ({});

export default connect(mapStoreToAction, mapActionsToProps)(Component);
