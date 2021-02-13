
import { Mode, Size } from '@ui.packages/types';

import React from 'react';
import types from 'prop-types';

import Bay from './Bay';
import Cart from './Cart';
import Create from './Create';
import Default from './Default';
import Context from "./Context";
import Outline from './Outline';


export default function ButtonFactory({ form, children, ...props }) {
  switch(form) {
    case ButtonFactory.FORM_DEFAULT: return <Default {...props}>{ children }</Default>;
    case ButtonFactory.FORM_CONTEXT: return <Context {...props}>{ children }</Context>;
    case ButtonFactory.FORM_OUTLINE: return <Outline {...props}>{ children }</Outline>;
    case ButtonFactory.FORM_CREATE: return <Create {...props}>{ children }</Create>;
    case ButtonFactory.FORM_CART: return <Cart {...props}>{ children }</Cart>;
    case ButtonFactory.FORM_BAY: return <Bay {...props}>{ children }</Bay>;
    default: return <Default {...props}>{ children }</Default>;
  }
}

ButtonFactory.TYPE_BUTTON = 'button';
ButtonFactory.TYPE_SUBMIT = 'submit';

ButtonFactory.FORM_BAY = 'bay';
ButtonFactory.FORM_CART = 'cart';
ButtonFactory.FORM_CREATE = 'create';
ButtonFactory.FORM_DEFAULT = 'default';
ButtonFactory.FORM_CONTEXT = 'context';
ButtonFactory.FORM_OUTLINE = 'outline';


ButtonFactory.propTypes = {
  className: types.string,
  type: types.oneOf([ButtonFactory.TYPE_BUTTON, ButtonFactory.TYPE_SUBMIT]),
  form: types.oneOf([ButtonFactory.FORM_DEFAULT, ButtonFactory.FORM_CONTEXT, ButtonFactory.FORM_CREATE, ButtonFactory.FORM_OUTLINE, ButtonFactory.FORM_CART, ButtonFactory.FORM_BAY]),
  mode: types.oneOf([Mode.DEFAULT, Mode.INFO, Mode.PRIMARY, Mode.DANGER, Mode.WARNING, Mode.SUCCESS]),
  size: types.oneOf([Size.SMALL, Size.MEDIUM, Size.LARGE]),
  children: types.any,
  disabled: types.bool,
  onClick: types.func,
};

ButtonFactory.defaultProps = {
  className: null,
  form: ButtonFactory.FORM_DEFAULT,
  type: ButtonFactory.TYPE_BUTTON,
  mode: Mode.DEFAULT,
  size: Size.MEDIUM,
  disabled: false,
  children: 'Button',
  onClick: null,
};
