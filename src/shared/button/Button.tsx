import { FC, ReactElement, ReactNode } from 'react';
import { IButtonProps } from '../shared.inferface';

const Button: FC<IButtonProps> = (props): ReactElement => {
  const { testId, className, disabled, id, label, onClick, type } = props;
  return (
    <button 
    id={id} 
    data-testid={testId} 
    className={className} 
    disabled={disabled} 
    onClick={onClick} 
    type={type}>
      {label }
    </button>
  );
};
export default Button;
