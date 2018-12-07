import React from 'react';
import cx from 'classnames';
import { stateTypes} from './Question';

export default ({ children, state, onClick, disabled, loading }) => {
  if (loading) {
    return <button className="btn" disable><i className="fa fa-circle-o-notch fa-spin"></i></button>;
  }

  const className = cx({
    btn: true,
    'btn-success': state === stateTypes.RIGHT,
    'btn-danger': state === stateTypes.WRONG
  });

  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};
