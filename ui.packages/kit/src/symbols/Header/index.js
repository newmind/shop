
import React from 'react';
import types from 'prop-types';

import Level1 from './Level1';
import Level2 from './Level2';
import Level3 from './Level3';
import Level4 from './Level4';


export default function HeaderFactory({ className, children, level, bold }) {
  switch(level) {
    case 1: return <Level1 className={className} bold={bold}>{ children }</Level1>;
    case 2: return <Level2 className={className} bold={bold}>{ children }</Level2>;
    case 3: return <Level3 className={className} bold={bold}>{ children }</Level3>;
    case 4: return <Level4 className={className} bold={bold}>{ children }</Level4>;

    default: return <Level1 className={className} bold={bold}>{ children }</Level1>;
  }
}

HeaderFactory.propTypes = {
  level: types.number,
  className: types.string,
  children: types.any,
  bold: types.bool,
};

HeaderFactory.defaultProps = {
  level: 1,
  className: '',
  children: null,
  bold: true,
};
