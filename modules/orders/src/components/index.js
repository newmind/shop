
import PageHOC from '@ui.packages/hocs';

import { bindActionCreators } from 'redux';

import Component from './Component';

import { pageInProcess, getOperations, getStatuses } from '../ducks/commands';


const mapStateToProps = (state) => ({
  items: state['orders']['items'],
  statuses: state['orders']['statuses'],
});

const mapActionsToProps = (dispatch) => bindActionCreators({
  pageInProcess,
  getOperations,
  getStatuses,
}, dispatch);


export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: async ({ pageInProcess, getOperations, getStatuses }) => {
    await getStatuses();
    await getOperations();
    pageInProcess(false);
  }
})(Component);