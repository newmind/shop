
import PageHOC from '@ui.packages/hocs';

import { bindActionCreators } from 'redux';

import { pageInProcess } from '../ducks/commands';

import Component from './Component';


const mapStateToProps = () => ({});

const mapActionsToProps = (dispatch) => ({
  pageInProcess: bindActionCreators(pageInProcess, dispatch),
});

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: ({ pageInProcess }) => {
    pageInProcess(false);
  }
})(Component);