
import PageHOC from '../../_bin/PageHOC';

import Component from './Component';


const mapStateToProps = state => {
  const cart = state['cart'];
  return {
    products: cart['items'],
  };
};

const mapActionsToProps = (dispatch) => ({});


export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: ({ onLoading }) => {
    onLoading(false);
  },
})(Component);
