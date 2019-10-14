
import { bindActionCreators } from 'redux';

import PageHOC from '@ui.packages/hocs';

import Component from './Component';

import { pageInProcess } from '../ducks/commands';


const mapStateToProps = () => ({});

const mapActionsToProps = (dispatch) => ({
  pageInProcess: bindActionCreators(pageInProcess, dispatch),
});

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: ({ pageInProcess }) => {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Информация для Вас`;
    pageInProcess(false);
  },
})(Component);
