
import React from 'react';
import types from 'prop-types';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import styles from './default.module.scss';


export default function LinkHref({ className, href, children }) {
  return (
    <Link className={cn(styles['link'], className)} to={process.env['PUBLIC_URL'] + href}>{ children }</Link>
  );
}

LinkHref.propTypes = {
  className: types.string,
  href: types.string,
  children: types.any,
};

LinkHref.defaultProps = {
  className: '',
  href: '#',
  children: 'No content Text Default',
};
