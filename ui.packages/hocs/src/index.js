
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class Wrapper extends Component {
  static propTypes = {
    onEnter: PropTypes.func,
    onChange: PropTypes.func,
    onDestroy: PropTypes.func,
  };

  async componentDidMount() {
    const { onEnter, children } = this.props;
    onEnter && await onEnter(children.props);
  }
  async componentWillUnmount() {
    const { onDestroy, children } = this.props;
    onDestroy && await onDestroy(children.props);
  }
  async componentDidUpdate(prevProps) {
    const { onChange, children } = prevProps;
    const { location } = children.props;
    if (this.props.children.props.location.key !== location.key) {
      onChange && await onChange(children.props);
    }
  }
  render() {
    return this.props.children;
  }
}

export default (options) => (Component) => {

  const defaultOptions = {
    module: null,
    mapStateToProps: null,
    mapActionsToProps: null,
    ...options,
  };

  const HOComponent = (props) => {
    return (
      <Wrapper
        onEnter={defaultOptions['onEnter']}
        onChange={defaultOptions['onChange']}
        onDestroy={defaultOptions['onDestroy']}
      >
        <Component {...props} />
      </Wrapper>
    );
  };

  return withRouter(
    connect(
      defaultOptions.mapStateToProps,
      defaultOptions.mapActionsToProps,
    )(HOComponent)
  );
};