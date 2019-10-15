
import { bindActionCreators } from 'redux';
import { submit, isValid } from 'redux-form';

import PageHOC from '@ui.packages/hocs';

import Component from './Component';

import { pageInProcess, createOperation, getLenses } from '../ducks/commands';


const mapStateToProps = state => {
  const cart = state['cart'];
  return {
    products: cart['items'],
    isValid: isValid('order')(state),
  };
};

const mapActionsToProps = (dispatch) => ({
  pageInProcess: bindActionCreators(pageInProcess, dispatch),

  submit: bindActionCreators(submit, dispatch),

  getLenses: bindActionCreators(getLenses, dispatch),
  createOperation: bindActionCreators(createOperation, dispatch),
});


export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: async ({ pageInProcess }) => {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Оформление заказа`;
    pageInProcess(false);
  },
})(Component);
