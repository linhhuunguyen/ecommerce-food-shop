import React, { ComponentPropsWithoutRef } from 'react';

import styles from './button.module.css';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <button type="button" className={styles.button} {...props}>
      {children}
    </button>
  );
}

export default Button;
