/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

export type ButtonVariant = 'primary' | 'secondary';
interface IButtonProps {
  variant?: ButtonVariant;
  loading?: boolean;
  loadingMessage?: React.ReactNode;
}
type FullButtonProps = IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
export const Button: React.FC<FullButtonProps> = ({
  variant = 'primary', type = 'button', className = '', children, value, loading, loadingMessage = children ?? value, disabled, ...props
}) => {
  const content = loading ? loadingMessage : children ?? value;

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={`btn btn--${variant} ${className}`} disabled={loading ?? disabled} {...props}>{content}</button>
  );
};

interface IButtonGroupProps {
  children: React.ReactElement[];
}
export const ButtonGroup: React.FC<IButtonGroupProps> = ({ children }) => (
  <div className="btn-group">
    {children
      .map((btn, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className={`btn-group__item ${i === (children.length - 1) ? 'btn-group__item--last' : ''} ${btn.props.className ?? ''}`}>
          {btn}
        </div>
      ))}
  </div>
);
