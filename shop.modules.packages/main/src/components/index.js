
import { bindActionCreators } from 'redux';
import PageHOC from '@ui.packages/hocs';

import Component from './Component';

import { pageInProcess } from '../ducks/commands';


const mapStateToProps = state => {
  const cart = state['cart'];
  return {
    products: cart['items'],
  };
};

const mapActionsToProps = (dispatch) => ({
  pageInProcess: bindActionCreators(pageInProcess, dispatch),
});


export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: ({ pageInProcess }) => {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']}`;
    pageInProcess(false)
  },
})(Component);
