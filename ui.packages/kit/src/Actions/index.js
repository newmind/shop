
import types from 'prop-types';
import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


const Actions = (props) => {
  const { onEdit, onDelete } = props;
  return (
    <div className={styles['block']}>
      {onEdit && <span className={cn(styles['action'], styles['action--edit'], 'fas fa-edit')} onClick={props.onEdit} />}
      {onDelete && <span className={cn(styles['action'], styles['action--delete'], 'far fa-trash-alt')} onClick={props.onDelete} />}
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
