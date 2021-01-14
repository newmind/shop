
import HOC from '@ui.packages/hoc';

import Component from './Component';

import { resetStateAction } from '../ducks/slice';
import { getProductById } from '../ducks/commands';


// import {
//   pageInProcess,
//
//   addProductToCart,
//   removeProductFromCart,
//
//   getProductById,
//   createComment,
// } from '../ducks/commands';
//
//
// const mapStateToProps = state => {
//   const Product = state['product'];
//   return {
//     product: Product['product'],
//     cart: state['cart']['items'],
//     initialValues: {
//       evaluation: 0,
//       person: '',
//       comment: '',
//     }
//   };
// };

// const mapActionsToProps = (dispatch) => {
//   return {
//     pageInProcess: bindActionCreators(pageInProcess, dispatch),
//
//     openDialog: bindActionCreators(openDialog, dispatch),
//     closeDialog: bindActionCreators(closeDialog, dispatch),
//
//     addProductToCart: bindActionCreators(addProductToCart, dispatch),
//     removeProductFromCart: bindActionCreators(removeProductFromCart, dispatch),
//
//     getProductById: bindActionCreators(getProductById, dispatch),
//     createComment: bindActionCreators(createComment, dispatch),
//   };
// };

export default HOC({
  onMount({ dispatch, params }) {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Товар`;
    document.querySelector('meta[name="description"]').setAttribute("content", 'Товар');

    dispatch(getProductById(params['id']));
  },
  onUnmount({ dispatch }) {
    dispatch(resetStateAction());
  }
})(Component);
