
import PageHOC from '@ui.packages/hocs';

import { bindActionCreators } from 'redux';

import Component from './Component';

import {
  pageInProcess,
  getOperationById,
} from '../ducks/commands';


const mapStateToProps = () => {
  return {
  };
};

const mapActionsToProps = (dispatch) => ({
  pageInProcess: bindActionCreators(pageInProcess, dispatch),
  getOperationById: bindActionCreators(getOperationById, dispatch),
});


export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: async ({ pageInProcess, getOperationById, match }) => {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Информация о заказе`;
    const { id: operationId } = match['params'];
    await getOperationById(operationId);
    pageInProcess(false);
  },
})(Component);
