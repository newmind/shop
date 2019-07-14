
import PageHOC from '../../_bin/PageHOC';
import { bindActionCreators } from 'redux';
import { submit } from 'redux-form';

import { openDialog } from '@ui.packages/dialog';

import Component from './Component';


const mapStateToProps = state => {
  const cart = state['cart'];
  return {
    products: cart['items'],
  };
};

const mapActionsToProps = (dispatch) => ({
  submit: bindActionCreators(submit, dispatch),
  openDialog: bindActionCreators(openDialog, dispatch),
});


export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: ({ onLoading }) => {
    onLoading(false);
  },
})(Component);
