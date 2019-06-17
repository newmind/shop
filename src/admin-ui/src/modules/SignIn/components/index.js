
import PageHOC from '../../_bin/PageHOC';
import { isValid } from 'redux-form';
import Component from './Component';


const mapStateToProps = state => ({
  isValid: isValid('sign-in')(state),
});

const mapActionsToProps = (dispatch) => {
  return {};
};

export default PageHOC({
    mapStateToProps,
    mapActionsToProps,
    onEnter: ({ onLoading }) => {
      onLoading(false);
      console.log('onLoad');
    },
    onChange: () => {
      console.log('onChange');
    },
    onDestroy: () => {
      console.log('onDestroy');
    },
  }
)(Component);