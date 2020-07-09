
import withSizes from 'react-sizes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

import Component from './Component';

import { getProfile, changeState, signIn, signOut, signDialog } from '../ducks/commands';


const mapStateToProps = (store) => {
  const App = store['application'];

  return {
    isInit: App['isInit'],
    isAuth: App['isAuth'],
    profile: App['profile'],
  };
};

const mapActionsToProps = dispatch => ({
  signIn: bindActionCreators(signIn, dispatch),
  signOut: bindActionCreators(signOut, dispatch),
  getProfile: bindActionCreators(getProfile, dispatch),
  changeState: bindActionCreators(changeState, dispatch),
  signDialog: bindActionCreators(signDialog, dispatch),
});

export default withSizes(({ width }) => ({
  isMobile: (width < 480),
  isTablet: (480 && width < 1024),
  isDesktop: (width >= 1024),
}))(
  withRouter(
    connect(
      mapStateToProps,
      mapActionsToProps
    )(Component)
  )
);

