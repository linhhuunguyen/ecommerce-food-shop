import React, { ComponentPropsWithoutRef } from 'react';

import styles from './button.module.css';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
  params?: string;
}

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  params: ''
};

export default Button;
