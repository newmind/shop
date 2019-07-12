
import {
  createTabsAction,
  removeTabsAction,

  setActiveTabAction,
} from './actions';


export const createTabs = (name, tabName) => dispatch => {
  dispatch(createTabsAction(name, tabName));
};

export const removeTabs = (name) => dispatch => {
  dispatch(removeTabsAction(name));
};

export const setActiveTab = (tabsName, tabName) => dispatch => {
  dispatch(setActiveTabAction(tabsName, tabName));
};
