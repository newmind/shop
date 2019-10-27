
// @ts-ignore
import PageHOC from '@ui.packages/hocs';

import { bindActionCreators, Dispatch } from 'redux';

import Component from './Component';

import { pageInProcess } from '../ducks/commands';


interface IProps {
  readonly pageInProcess: (status: boolean) => void
}


const mapStateToProps = () => ({});

const mapActionsToProps = (dispatch: Dispatch): IProps => ({
  pageInProcess: bindActionCreators(pageInProcess, dispatch)
});


export default PageHOC({
  mapStateToProps,
  mapActionsToProps,
  onEnter: ({ pageInProcess }: IProps): void => {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Информация для Вас`;
    pageInProcess(false);
  },
})(Component);
