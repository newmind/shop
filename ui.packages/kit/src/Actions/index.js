
import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


const Actions = ({ onEdit, onDelete }) => {
  return (
    <div className={styles['block']}>
      {onEdit && <span className={cn(styles['action'], styles['action--edit'], 'fas fa-edit')} onClick={onEdit} />}
      {onDelete && <span className={cn(styles['action'], styles['action--delete'], 'far fa-trash-alt')} onClick={onDelete} />}
    </div>
  );
};

Actions.propTypes = {
  onEdit: types.func,
  onDelete: types.func,
};

Actions.defaultProps = {
  onEdit: null,
  onDelete: null,
};

export default Actions;
