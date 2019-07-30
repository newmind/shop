
import PageHOC from '../../_bin/PageHOC';

import { bindActionCreators } from 'redux';
import { submit } from 'redux-form';

import Component from './Component';


const mapStateToProps = state => {
  const cart = state['cart'];
  return {
    products: cart['items'],
  };
};

const mapActionsToProps = (dispatch) => ({
  submit: bindActionCreators(submit, dispatch),
});


export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: ({ onLoading }) => {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Оформление заказа`;
    onLoading(false);
  },
})(Component);
