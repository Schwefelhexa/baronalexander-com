/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useField } from 'formik';

// NOTE: In order to prevent input fields from moving when errors occur, the error span is always rendered
// with a fixed height

interface IInputProps {
  label: string;
  name: string;
}
type FullInputProps = IInputProps & React.InputHTMLAttributes<HTMLInputElement>;
export const Input: React.FC<FullInputProps> = ({
  label, name, ...props
}) => {
  const [field, meta] = useField(name);

  return (
    <div className="inputgroup">
      <label htmlFor={name} className="inputgroup__label">{label}</label>
      <input id={name} className="inputgroup__input" {...field} {...props} />
      <span className="inputgroup__error">{meta.touched && meta.error}</span>
    </div>
  );
};

type FullTextareaProps = IInputProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export const Textarea: React.FC<FullTextareaProps> = ({
  label, name, value, ...props
}) => {
  const [field, meta] = useField(name);

  return (
    <div className="inputgroup">
      <label htmlFor={name} className="inputgroup__label">{label}</label>
      <TextareaAutosize id={name} className="inputgroup__textarea" {...field} {...props}>{value}</TextareaAutosize>
      <span className="inputgroup__error">{meta.touched && meta.error}</span>
    </div>
  );
};
