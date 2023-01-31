export type InputType = 'email' | 'number' | 'password' | 'text';

interface InputProps {
  labelText: string;
  inputType: InputType;
}

export function Input(props: InputProps) {
  return (
    <div>
      <label>{props.labelText}</label>
      <input type={props.inputType} />
    </div>
  );
}
