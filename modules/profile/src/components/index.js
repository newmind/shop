
import HOC from '@ui.packages/hoc';

import Component from './Component';

import { getProfile } from '../ducks/commands';
import { resetStateAction } from '../ducks/slice';


// const mapStateToProps = state => {
//   const Profile = state['profile'];
//   return {
//     profile: Profile['profile'],
//     isValid: isValid('profile')(state),
//     isPristine: isPristine('profile')(state),
//   };
// };
//
// const mapActionsToProps = (dispatch) => {
//   return {
//     submit: bindActionCreators(submit, dispatch),
//     getProfile: bindActionCreators(getProfile, dispatch),
//     saveProfile: bindActionCreators(saveProfile, dispatch),
//   };
// };

export default HOC({
  async onMount({ dispatch }) {

    await dispatch(getProfile());
  },
  async onUpdate({ dispatch }) {

    await dispatch(getProfile());
  },
  onUnmount({ dispatch }) {

    dispatch(resetStateAction());
  },
})(Component);
