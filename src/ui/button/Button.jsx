import React from 'react';
import './Button.css';
import clsx from 'clsx';

const Button = ({ children, onClick, className = '', variant = 'default', ...props }) => {
  return (
    <button onClick={onClick} className={clsx('button', variant && `button--${variant}`, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
