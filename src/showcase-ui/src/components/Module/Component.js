
import PropTypes from 'prop-types';
import React, { Suspense, PureComponent, lazy } from 'react';

import { injectAsyncReducer, rejectAsyncReducer } from '../../bin/createStore';

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

class Component extends PureComponent {
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

  async componentDidMount() {
    const { module } = this.props;
    const { default: moduleReducer } = await import(`../../modules/${module}/ducks/reducer.js`);
    await injectAsyncReducer(module, moduleReducer);
  }

  async componentWillUnmount() {
    const { removable } = this.props;
    if (removable) {
      await rejectAsyncReducer(module);
    }
  }

  render() {
    const { navigate, wrapper, location, match, dispatch, module } = this.props;
    const Wrapper = createWrapper(wrapper);
    const Module = lazy(() => import(`../../modules/${module}/components`));
    return (
      <Suspense>
        <Wrapper navigate={navigate} location={location} match={match}>
          <Page>
            { Module && <Module dispatch={dispatch} /> }
          </Page>
        </Wrapper>
      </Suspense>
    );
  }
}

export default Component;
