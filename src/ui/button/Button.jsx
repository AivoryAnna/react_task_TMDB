import React from 'react';
import './Button.css';
import clsx from 'clsx';

const Button = React.forwardRef(({ children, onClick, className = '', variant = 'default', ...props }, ref) => {
  return (
    <button ref={ref} onClick={onClick} className={clsx('button', variant && `button--${variant}`, className)} {...props}>
      {children}
    </button>
  );
});

export default Button;

