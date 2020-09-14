
import PageHOC from '@ui.packages/hocs';

import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import Component from './Component';

import {
  pageInProcess,
  getTypes,
  getCategories,
} from '../ducks/commands';


const mapStateToProps = (state) => ({
  inProcess: state['main']['inProcess'],
});

const mapActionsToProps = (dispatch) => ({
  pageInProcess: bindActionCreators(pageInProcess, dispatch),

  pushSearch: bindActionCreators(push, dispatch),
  getTypes: bindActionCreators(getTypes, dispatch),
  getCategories: bindActionCreators(getCategories, dispatch),
});


export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: async ({ pageInProcess, getTypes, getCategories }) => {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Витрина`;
    document.querySelector('meta[name="description"]').setAttribute('content', 'Интернет магазин. Продажа и изготовление очков для зрения. Солнцезащитные очки. Изготовление очков по рецепту');

    await getTypes();
    await getCategories();

    pageInProcess(false);
  },
})(Component);
