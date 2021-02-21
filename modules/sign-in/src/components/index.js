
import { useMount, useUpdate, useUnmount } from '@ui.packages/hoc';

import React from 'react';

import Component from './Component';

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { isValid, isPristine, submit } from 'redux-form';
//
//
// const mapStateToProps = state => ({
//   isValid: isValid('sign-in')(state),
//   isPristine: isPristine('sign-in')(state),
// });
//
// const mapActionsToProps = (dispatch) => {
//   return {
//     submit: bindActionCreators(submit, dispatch),
//   };
// };
//
//
// export default connect(
//   mapStateToProps,
//   mapActionsToProps,
// )(Component);

export default function HOC() {
  useMount(function() {
    console.log('mount');
  });
  useUpdate(function() {
    console.log('update');
  });
  useUnmount(function() {
    console.log('unmount');
  });

  return <Component />;
}