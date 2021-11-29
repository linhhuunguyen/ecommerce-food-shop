import { ComponentPropsWithoutRef } from 'react';

import styles from './input.module.css';

interface InputProps extends ComponentPropsWithoutRef<'input'> {}

const Input = ({ ...props }: InputProps) => (
  <input className={styles.inputStyle} {...props} />
);

export default Input;
