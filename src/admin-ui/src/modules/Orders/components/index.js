
import PageHOC from '../../_bin/PageHOC';

import Component from './Component';


const mapStateToProps = state => ({});

const mapActionsToProps = (dispatch) => {
  return {};
};

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: ({ onLoading }) => {
    console.log('onEnter');
    onLoading(false);
  },
})(Component);