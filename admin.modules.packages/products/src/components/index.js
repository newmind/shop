
import PageHOC from '@ui.packages/hocs';
import { queryToObject } from "@ui.packages/utils";

import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import Component from './Component';

import {
  pageInProcess,

  getProducts,
  createProducts,
} from '../ducks/commands';


const mapStateToProps = (state, props) => {
  return {
    search: queryToObject(props['location']['search']),
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    pageInProcess: bindActionCreators(pageInProcess, dispatch),

    push: bindActionCreators(push, dispatch),

    getProducts: bindActionCreators(getProducts, dispatch),
    createProducts: bindActionCreators(createProducts, dispatch),
  };
};

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: async ({ pageInProcess, getProducts, location: { search }}) => {
    pageInProcess(false);
    await getProducts(queryToObject(search));
    pageInProcess(false);
  },
})(Component);