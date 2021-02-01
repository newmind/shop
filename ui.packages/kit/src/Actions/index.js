
import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


const Actions = ({ onEdit, onDelete, onCopy }) => {
  return (
    <div className={styles['block']}>
      {onCopy && <span className={cn(styles['action'], styles['action--copy'], 'far fa-copy')} onClick={onCopy} />}
      {onEdit && <span className={cn(styles['action'], styles['action--edit'], 'fas fa-edit')} onClick={onEdit} />}
      {onDelete && <span className={cn(styles['action'], styles['action--delete'], 'far fa-trash-alt')} onClick={onDelete} />}
    </div>
  );
};

Actions.propTypes = {
  onEdit: types.func,
  onCopy: types.func,
  onDelete: types.func,
};

Actions.defaultProps = {
  onEdit: null,
  onCopy: null,
  onDelete: null,
};

export default Actions;
