
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { injectAsyncReducer } from '../../../bin/createStore';

import Page from '../../Page/components'

import None from '../../wrappers/None';
import Empty from '../../wrappers/Empty';
import Navigate from '../../wrappers/Navigate';
import Composite from '../../wrappers/Composite';


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

  constructor(...props) {
    super(...props);

    this.state = {
      Module: null,
    };
  }

  async componentDidMount() {
    const { module, setProcess } = this.props;

    setProcess();

    const { default: moduleReducer } = await import(`../../../modules/${module}/ducks/reducer.js`);
    const { default: Module } = await import(`../../../modules/${module}/components`);

    injectAsyncReducer(module, moduleReducer);

    this.setState({ Module });
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    const { Module } = this.state;
    const { inProcess, setProcess } = this.props;
    if (Module && inProcess === nextProps['inProcess']) {
      setProcess();
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { Module } = this.state;
    return Module !== nextState['Module'];
  }

  render() {
    const { navigate, wrapper, location, dispatch, setProcess } = this.props;
    const { Module } = this.state;
    const Wrapper = createWrapper(wrapper);
    return (
      <Wrapper navigate={navigate} location={location}>
        <Page setProcess={setProcess}>
          { Module && <Module dispatch={dispatch} /> }
        </Page>
      </Wrapper>
    );
  }
}

export default ModuleComponent;
