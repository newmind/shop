
import PageHOC from '@ui.packages/hocs';

import { bindActionCreators } from 'redux';

import Component from './Component';

import { pageInProcess, getUsers } from '../ducks/commands';


const mapStateToProps = () => ({});

const mapActionsToProps = (dispatch) => bindActionCreators({
  pageInProcess,
  getUsers,
}, dispatch);


export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: async ({ pageInProcess, getUsers }) => {
    pageInProcess(true);
    await getUsers();
    pageInProcess(false);
  }
})(Component);