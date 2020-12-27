
import { Mode, Size } from '@ui.packages/types';

import React from 'react';
import types from 'prop-types';

import Default from './Default';
import Context from "./Context";
import Outline from './Outline';
import Cart from './Cart';


const TYPE_BUTTON = 'button';
const TYPE_SUBMIT = 'submit';

const FORM_DEFAULT = 'default';
const FORM_CONTEXT = 'context';
const FORM_OUTLINE = 'outline';
const FORM_CART = 'cart';


export default function ButtonFactory({ form, children, ...props }) {
  switch(form) {
    case FORM_DEFAULT: return <Default {...props}>{ children }</Default>;
    case FORM_CONTEXT: return <Context {...props}>{ children }</Context>;
    case FORM_OUTLINE: return <Outline {...props}>{ children }</Outline>;
    case FORM_CART: return <Cart {...props}>{ children }</Cart>;
    default: return <Default {...props}>{ children }</Default>;
  }
}

ButtonFactory.propTypes = {
  className: types.string,
  type: types.oneOf([TYPE_BUTTON, TYPE_SUBMIT]),
  form: types.oneOf([FORM_DEFAULT, FORM_CONTEXT, FORM_OUTLINE, FORM_CART]),
  mode: types.oneOf([Mode.DEFAULT, Mode.INFO, Mode.PRIMARY, Mode.DANGER, Mode.WARNING, Mode.SUCCESS]),
  size: types.oneOf([Size.SMALL, Size.MEDIUM, Size.LARGE]),
  children: types.any,
  disabled: types.bool,
  onClick: types.func,
};

ButtonFactory.defaultProps = {
  className: null,
  form: FORM_DEFAULT,
  type: TYPE_BUTTON,
  mode: Mode.DEFAULT,
  size: Size.MEDIUM,
  disabled: false,
  children: 'Button',
  onClick: null,
};
