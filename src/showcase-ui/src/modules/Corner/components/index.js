
import PageHOC from '@ui.packages/hocs';

import Component from './Component';


const mapStateToProps = () => ({});

const mapActionsToProps = () => {
  return {};
};

export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: () => {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Информация для Вас`;
  },
})(Component);
