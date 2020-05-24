/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

interface IButtonProps {
  variant?: 'primary' | 'secondary';
}
type FullButtonProps = IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
export const Button: React.FC<FullButtonProps> = ({
  variant = 'primary', type = 'button', className = '', children, value, ...props
}) => (
  // eslint-disable-next-line react/button-has-type
  <button type={type} className={`btn btn--${variant} ${className}`} {...props}>{children ?? value}</button>
);


interface IButtonGroupProps {
  children: React.ReactElement<FullButtonProps>[];
}
export const ButtonGroup: React.FC<IButtonGroupProps> = ({ children }) => (
  <div className="btn-group">
    {children.map((btn, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Button key={i} {...{ ...btn.props, className: `btn-group__item ${i === (children.length - 1) ? 'btn-group__item--last' : ''}` }} />
    ))}
  </div>
);