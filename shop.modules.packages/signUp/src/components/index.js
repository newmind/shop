
import PageHOC from '@ui.packages/hocs';

import { bindActionCreators } from 'redux';

import Component from './Component';

import { pageInProcess, signUp } from '../ducks/commands';


const mapStateToProps = () => ({});

const mapActionsToProps = (dispatch) => bindActionCreators({
  pageInProcess,
  signUp,
}, dispatch);


export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: ({ pageInProcess }) => {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Регистрация личного кабинета`;
    document.querySelector('meta[name="description"]').setAttribute('content', 'Регистрация нового пользователя');

    pageInProcess(false);
  },
})(Component);
