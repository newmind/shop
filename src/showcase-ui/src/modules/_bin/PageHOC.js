
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

  componentDidMount() {
    const { onEnter, children } = this.props;
    onEnter && onEnter(children.props);
  }
  componentWillUnmount() {
    const { onDestroy, children } = this.props;
    onDestroy && onDestroy(children.props);
  }
  componentDidUpdate(prevProps) {
    const { onChange, children } = prevProps;
    const { location } = children.props;
    if (prevProps.children.props.location.key !== location.key) {
      onChange && onChange(children.props);
    }
  }
  render() {
    return this.props.children;
  }
}

export default (options) => Component => {

  const defaultOptions = {
    module: null,
    mapStateToProps: null,
    mapActionsToProps: null,
    ...options,
  };

  const HOComponent = (props) => {
    return (
      <Wrapper
        onEnter={defaultOptions.onEnter}
        onChange={defaultOptions.onChange}
        onDestroy={defaultOptions.onDestroy}
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