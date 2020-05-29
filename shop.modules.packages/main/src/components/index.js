
import PageHOC from '@ui.packages/hocs';

import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import Component from './Component';

import {
  pageInProcess,
  getCategories
} from '../ducks/commands';


const mapStateToProps = (state) => ({
  inProcess: state['showcase']['inProcess'],
});

const mapActionsToProps = (dispatch) => ({
  pageInProcess: bindActionCreators(pageInProcess, dispatch),

  pushSearch: bindActionCreators(push, dispatch),
  getCategories: bindActionCreators(getCategories, dispatch),
});


export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: async ({ pageInProcess, getCategories }) => {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Витрина`;

    await getCategories();

    pageInProcess(false);
  },
})(Component);
