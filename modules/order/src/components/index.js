
import HOC from "@ui.packages/hoc";

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { submit, isValid, getFormValues } from 'redux-form';

import Component from './Component';

// import { pageInProcess, createOperation } from '../ducks/commands';


// const mapStateToProps = (state) => {
//   return {
//     products: getFormValues('order')(state),
//     hasProducts: !! state['cart']['items'].length,
//     inProcess: state['order']['inProcess'],
//     isValid: isValid('order')(state),
//   };
// };
//
// const mapActionsToProps = (dispatch) => ({
//   pageInProcess: bindActionCreators(pageInProcess, dispatch),
//
//   submit: bindActionCreators(submit, dispatch),
//   createOperation: bindActionCreators(createOperation, dispatch),
// });


export default HOC({
  onMount: () => {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Оформление заказа`;
    document.querySelector('meta[name="description"]').setAttribute('content', 'Выбор очков, оправ и аксесуаров');
  }
})(Component);
