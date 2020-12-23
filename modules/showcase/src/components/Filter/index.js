
import { connect } from 'react-redux';

import Component from './Component';


const mapStateToProps = (state) => {
  const Showcase = state['showcase'];

  return {
    types: Showcase['types'],
    categories: Showcase['categories'],
    brands: Showcase['brands'],
    colors: Showcase['colors'],
    forms: Showcase['forms'],
    materials: Showcase['materials'],
    inProcess: Showcase['inProcess'],
  }
};

const mapActionsToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Component);
