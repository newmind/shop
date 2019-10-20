
import PageHOC from '@ui.packages/hocs';

import { bindActionCreators } from 'redux';

import { pageInProcess } from '../ducks/commands';

import Component from './Component';

import { getOperations } from '../ducks/commands';


const mapStateToProps = (state) => ({
  items: state['orders']['items']
});

const mapActionsToProps = (dispatch) => ({
  pageInProcess: bindActionCreators(pageInProcess, dispatch),
  getOperations: bindActionCreators(getOperations, dispatch),
});

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: async ({ pageInProcess, getOperations }) => {
    await getOperations();
    pageInProcess(false);
  }
})(Component);