
import { openDialog, closeDialog } from '@ui.packages/dialog';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Component from './Component';

import { createCurrency, updateCurrency, deleteCurrencies } from '../../ducks/commands';


const mapStateToProps = (state) => {
  const attrs = state['attributes'];
  return {
    items: attrs['currencies'],
  };
};

const mapActionsToProps = (dispatch) => bindActionCreators({
  openDialog,
  closeDialog,
  createCurrency,
  updateCurrency,
  deleteCurrencies,
}, dispatch);

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
