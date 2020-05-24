
import PageHOC from '@ui.packages/hocs';

import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import Component from './Component';


import { pageInProcess } from '../ducks/commands';


const mapStateToProps = (state) => ({
  inProcess: state['showcase']['inProcess'],
});

const mapActionsToProps = (dispatch) => ({
  pageInProcess: bindActionCreators(pageInProcess, dispatch),

  pushSearch: bindActionCreators(push, dispatch),
});


export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: async ({ pageInProcess, location: { search }}) => {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Витрина`;

    const searchParams = {};
    const params = new URLSearchParams(search);

    for (let [key, value] of params) {
      searchParams[key] = value;
    }

    pageInProcess(false);
  },
})(Component);
