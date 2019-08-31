
import { bindActionCreators } from 'redux';
import PageHOC from '@ui.packages/hocs';

import { submit } from 'redux-form';

import Component from './Component';

import { getProfile, saveProfile } from '../ducks/commands';


const mapStateToProps = state => {
  const Profile = state['Profile'];
  return {
    profile: Profile['profile'],
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    submit: bindActionCreators(submit, dispatch),
    getProfile: bindActionCreators(getProfile, dispatch),
    saveProfile: bindActionCreators(saveProfile, dispatch),
  };
};

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: async ({ getProfile, onLoading }) => {
    await getProfile();
    onLoading(false);
  },
})(Component);