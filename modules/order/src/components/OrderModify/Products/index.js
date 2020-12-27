//
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { getFormValues } from 'redux-form';
//
// import { openDialog, closeDialog } from '@ui.packages/dialog';
//
export { default } from './Component';
//
//
// const mapStateToProps = (state) => {
//   const cart = getFormValues('order')(state);
//   return {
//     items: cart['items'],
//   };
// };
//
// const mapActionsToProps = (dispatch) => ({
//   openDialog: bindActionCreators(openDialog, dispatch),
//   closeDialog: bindActionCreators(closeDialog, dispatch),
// });
//
//
// export default connect(
//   mapStateToProps,
//   mapActionsToProps,
// )(Component);
