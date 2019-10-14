
import PropTypes from 'prop-types';
import React, { PureComponent, Suspense, lazy } from 'react';

import { injectAsyncReducer, checkReducer } from '../../../bin/createStore';

import Page from '../../Page/components'

import Empty from '../../wrappers/Empty';
import Navigate from '../../wrappers/Navigate';
import Composite from '../../wrappers/Composite';


const wrapperFactory = (module) => (props) => {
  switch (module) {
    case 'Navigate': return <Navigate {...props} />;
    case 'Composite': return <Composite {...props} />;
    case 'Empty': return <Empty {...props} />;
    default: return null;
  }
};

class ModuleComponent extends PureComponent {
  static propTypes = {
    navigate: PropTypes.array,
    module: PropTypes.object,
    wrapper: PropTypes.string,
    setProcess: PropTypes.func,
  };

  static defaultProps = {
    navigate: [],
    module: 'Error',
    wrapper: '',
  };

  constructor(...props) {
    super(...props);

    this._createReducer()
      .then(void 0);
  }

  async _createReducer() {
    const { module, pageInProcess } = this.props;
    pageInProcess();
    const Module = await module;
    injectAsyncReducer(Module['name'], Module['reducer']);
    return void 0;
  }

  async componentDidUpdate() {
    const { module } = this.props;
    const hasReducer = checkReducer(module);
    if ( ! hasReducer) {
      await this._createReducer();
    }
  }

  render() {
    const { navigate, wrapper, module, location, dispatch } = this.props;
    const Wrapper = wrapperFactory(wrapper);
    const Module = lazy(() => module);
    return (
      <Wrapper navigate={navigate} location={location}>
        <Page>
          <Suspense fallback={null}>
            <Module dispatch={dispatch} />
          </Suspense>
        </Page>
      </Wrapper>
    );
  }
}

export default ModuleComponent;
