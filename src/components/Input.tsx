export type InputType = 'email' | 'number' | 'password' | 'text';

interface InputProps {
  id: string;
  labelText: string;
  inputType: InputType;
  required?: boolean;
}

export function Input(props: InputProps) {
  return (
    <div>
      <label htmlFor={props.id}>{props.labelText}</label>
      <input id={props.id} type={props.inputType} required={props.required} />
    </div>
  );
}
