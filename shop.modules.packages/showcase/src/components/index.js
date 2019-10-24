
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import PageHOC from '@ui.packages/hocs';
import { queryToObject } from '@ui.packages/utils';
import { openDialog, closeDialog } from '@ui.packages/dialog';

import Component from './Component';


import {
  pageInProcess,
  addProductToCart,
  getProducts,
  getDataForFilter,
} from '../ducks/commands';


const mapStateToProps = (state, props) => {
  const { location: { search }} = props;
  const showcase = state['showcase'];
  return {
    inProcess: showcase['inProcess'],
    items: showcase['items'],
    meta: showcase['meta'],
    count: showcase['count'],
    paging: showcase['paging'],
    query: queryToObject(search),
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    pageInProcess: bindActionCreators(pageInProcess, dispatch),

    pushSearch: bindActionCreators(push, dispatch),

    openDialog: bindActionCreators(openDialog, dispatch),
    closeDialog: bindActionCreators(closeDialog, dispatch),

    getDataForFilter: bindActionCreators(getDataForFilter, dispatch),
    getProducts: bindActionCreators(getProducts, dispatch),
    addProductToCart: bindActionCreators(addProductToCart, dispatch),
  };
};

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: async ({ pageInProcess, getProducts, getDataForFilter, location: { search } }) => {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Витрина`;

    const params = new URLSearchParams(search);
    const searchParams = {};

    let p;
    for (p of params) {
      searchParams[p[0]] = p[1];
    }

    await getProducts(searchParams);
    await getDataForFilter();

    pageInProcess(false);
  },
})(Component);
