import { ChangeEventHandler } from 'react';

export type InputType = 'email' | 'number' | 'password' | 'text';

interface InputProps {
  id: string;
  labelText: string;
  inputType: InputType;
  required?: boolean;
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export function Input(props: InputProps) {
  return (
    <div>
      <label htmlFor={props.id}>{props.labelText}</label>
      <input id={props.id} type={props.inputType} required={props.required} onChange={props.onChange} />
      {props.error && <p>{props.error}</p>}
    </div>
  );
}
