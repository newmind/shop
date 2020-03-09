
import PageHOC from '@ui.packages/hocs';

import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import Component from './Component';


import {
  pageInProcess,
  addProductToCart,
  getProducts,
} from '../ducks/commands';


const mapStateToProps = (state) => ({
  inProcess: state['showcase']['inProcess'],
});

const mapActionsToProps = (dispatch) => ({
  pageInProcess: bindActionCreators(pageInProcess, dispatch),

  pushSearch: bindActionCreators(push, dispatch),

  getProducts: bindActionCreators(getProducts, dispatch),
  addProductToCart: bindActionCreators(addProductToCart, dispatch),
});


export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: async ({ pageInProcess, getProducts, location: { search }}) => {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Витрина`;

    const searchParams = {};
    const params = new URLSearchParams(search);

    for (let [key, value] of params) {
      searchParams[key] = value;
    }

    await getProducts(searchParams);

    pageInProcess(false);
  },
})(Component);
