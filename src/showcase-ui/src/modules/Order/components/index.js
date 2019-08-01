
import PageHOC from '../../_bin/PageHOC';

import { bindActionCreators } from 'redux';
import { submit, isValid } from 'redux-form';

import Component from './Component';

import { createOperation } from '../ducks/commands';


const mapStateToProps = state => {
  const cart = state['cart'];
  return {
    products: cart['items'],
    isValid: isValid('order')(state),
  };
};

const mapActionsToProps = (dispatch) => ({
  submit: bindActionCreators(submit, dispatch),
  createOperation: bindActionCreators(createOperation, dispatch),
});


export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: ({ onLoading }) => {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Оформление заказа`;
    onLoading(false);
  },
})(Component);
