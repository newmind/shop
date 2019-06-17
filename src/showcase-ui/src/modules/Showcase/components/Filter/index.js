
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Component from './Component';
import {queryToObject} from "@packages/utils";


const mapStateToProps = (state, props) => {
  const Showcase = state['Showcase'];
  const { location: { search }} = props;
  const query = queryToObject(search);
  return {
    categories: Showcase['categories'],
    brands: Showcase['brands'],
    initialValues: query,
  }
};

const mapActionsToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(
  mapStateToProps,
  mapActionsToProps
)(reduxForm({
  form: 'filter-showcase-ui',
})(Component)));