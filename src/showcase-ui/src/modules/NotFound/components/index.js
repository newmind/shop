
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
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Страница не найдена`;
    onLoading(false);
  },
})(Component);
