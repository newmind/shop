
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { withRouter, useLocation } from 'react-router-dom';


function Wrapper({ onEnter, children, onDestroy }) {
  const location = useLocation();

  useEffect(() => {
    onEnter && onEnter(children.props);
    return async () => {
      onDestroy && onDestroy(children.props);
    };
  }, [location]);

  return children;
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
        onDestroy={defaultOptions['onDestroy']}
      >
        <Component {...props} />
      </Wrapper>
    );
  };

  return withRouter(
    connect(
      defaultOptions['mapStateToProps'],
      defaultOptions['mapActionsToProps'],
    )(HOComponent)
  );
};

Wrapper.propTypes = {
  onEnter: PropTypes.func,
  onDestroy: PropTypes.func,
};
