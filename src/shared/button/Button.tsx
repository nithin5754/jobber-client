import { FC, ReactElement } from 'react';
import { IButtonProps } from '../shared.interface';

const Button: FC<IButtonProps> = (props): ReactElement => {
  const { testId, className, disabled, id, label, onClick,role, type } = props;
  return (
    <button 
    id={id} 
    data-testid={testId} 
    className={className} 
    disabled={disabled} 
    role={role}
    onClick={onClick} 
    type={type}>
      {label }
    </button>
  );
};
export default Button;
