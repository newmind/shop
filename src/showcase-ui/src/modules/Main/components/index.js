
import PageHOC from '@ui.packages/hocs';

import Component from './Component';


const mapStateToProps = state => {
  const cart = state['cart'];
  return {
    products: cart['items'],
  };
};

const mapActionsToProps = () => ({});


export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: () => {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']}`;
  },
})(Component);
