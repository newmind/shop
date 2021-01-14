
import React from 'react';
import types from 'prop-types';

import Default from './Default';
import Comment from './Comment';
import Amount from './Amount';
import Body from './Body';
import UUID from './UUID';


function TextFactory({ className, children, type }) {
  switch(type) {
    case TextFactory.TYPE_DEFAULT: return <Default className={className}>{ children }</Default>;
    case TextFactory.TYPE_COMMENT: return <Comment className={className}>{ children }</Comment>;
    case TextFactory.TYPE_AMOUNT: return <Amount className={className}>{ children }</Amount>;
    case TextFactory.TYPE_BODY: return <Body className={className}>{ children }</Body>;
    case TextFactory.TYPE_UUID: return <UUID className={className}>{ children }</UUID>;
    default: return <Default className={className}>{ children }</Default>;
  }
}

TextFactory.TYPE_UUID = 'uuid';
TextFactory.TYPE_BODY = 'body';
TextFactory.TYPE_AMOUNT = 'amount';
TextFactory.TYPE_DEFAULT = 'default';
TextFactory.TYPE_COMMENT = 'comment';

TextFactory.propTypes = {
  type: types.oneOf([TextFactory.TYPE_DEFAULT, TextFactory.TYPE_COMMENT, TextFactory.TYPE_AMOUNT, TextFactory.TYPE_BODY, TextFactory.TYPE_UUID]),
  className: types.string,
  children: types.any,
};

TextFactory.defaultProps = {
  type: TextFactory.TYPE_DEFAULT,
  className: '',
  children: null,
};

export default TextFactory;
