
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { injectAsyncReducer } from '../../bin/createStore';

import Page from '../Page/components'

import None from '../wrappers/None';
import Empty from '../wrappers/Empty';
import Navigate from '../wrappers/Navigate';
import Composite from '../wrappers/Composite';


const createWrapper = type => props => {
  switch (type) {
    case 'Navigate': return <Navigate {...props} />;
    case 'Composite': return <Composite {...props} />;
    case 'Empty': return <Empty {...props} />;
    default: return <None {...props} />;
  }
};

class ModuleComponent extends Component {
  static propTypes = {
    navigate: PropTypes.array,
    module: PropTypes.string,
    wrapper: PropTypes.string,
    removable: PropTypes.bool,
  };

  static defaultProps = {
    navigate: [],
    module: 'Error500',
    removable: false,
  };

  state = {
    Module: null,
  };

  async componentDidMount() {
    const { module } = this.props;
    const { default: moduleReducer } = await import(`../../modules/${module}/ducks/reducer.js`);
    const { default: Module } = await import(`../../modules/${module}/components`);
    injectAsyncReducer(module, moduleReducer);
    this.setState({ Module });
  }

  componentWillUnmount() {
    // const { removable, module } = this.props;
    // if (removable) {
    //   rejectAsyncReducer(module);
    // }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.state['Module'] !== nextState['Module'];
  }

  render() {
    const { navigate, wrapper, location, dispatch } = this.props;
    const { Module } = this.state;
    const Wrapper = createWrapper(wrapper);
    return (
      <Wrapper navigate={navigate} location={location}>
        <Page>
          { Module && <Module dispatch={dispatch} /> }
        </Page>
      </Wrapper>
    );
  }
}

export default ModuleComponent;
