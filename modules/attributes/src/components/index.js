
import PageHOC from '@ui.packages/hocs';

import { bindActionCreators } from 'redux';

import Component from './Component';

import {
  pageInProcess,

  getTypes,
  getForms,
  getUnits,
  getColors,
  getMaterials,
  getCategories,
  getCurrencies,
} from '../ducks/commands';


const mapStateToProps = () => {
  return {};
};

const mapActionsToProps = (dispatch) => {
  return bindActionCreators({
    pageInProcess,
    getForms,
    getTypes,
    getUnits,
    getColors,
    getMaterials,
    getCategories,
    getCurrencies,
  }, dispatch);
};

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: async ({ pageInProcess, getTypes, getUnits, getCategories, getColors, getMaterials, getForms, getCurrencies }) => {
    pageInProcess(true);
    await getTypes();
    await getForms();
    await getUnits();
    await getColors();
    await getMaterials();
    await getCategories();
    await getCurrencies();
    pageInProcess(false);
  },
})(Component);