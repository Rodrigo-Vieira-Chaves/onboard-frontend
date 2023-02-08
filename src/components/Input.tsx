import { FormContext } from './Form';
import { useContext, useState } from 'react';
import { differenceInYears, isDate } from 'date-fns';

export enum InputType {
  EMAIL = 'email',
  PASSWORD = 'password',
  PHONE = 'tel',
  BIRTHDATE = 'date',
  TEXT = 'text',
}

const regexes: Record<InputType, (input: string) => boolean> = {
  [InputType.EMAIL]: (input: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input),
  [InputType.PASSWORD]: (input: string) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(input),
  [InputType.TEXT]: (input: string) => input.length > 0,
  [InputType.PHONE]: (input: string) =>
    /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/.test(input),
  [InputType.BIRTHDATE]: (input: string) => {
    const birth = new Date(input);
    const MINIMUM_AGE = 18;

    return isDate(birth) ? differenceInYears(Date.now(), birth) >= MINIMUM_AGE : false;
  },
};

interface InputProps {
  id: string;
  labelText: string;
  inputType: InputType;
  errorMessage: string;
  required?: boolean;
}

export function Input(props: InputProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const formContext = useContext(FormContext);

  const [inputStates, setInputStates] = formContext.inputStates;

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError('');
    setInput(e.target.value);

    setInputStates({ ...inputStates, [props.id]: e.target.value });
  }

  function validate() {
    const isValid = input ? regexes[props.inputType](input) : true;

    if (!isValid) {
      setError(props.errorMessage);
    }

    return isValid;
  }

  formContext.validators[props.id] = validate;

  return (
    <div>
      <label htmlFor={props.id}>{props.labelText}</label>
      <input id={props.id} type={props.inputType} required={props.required ?? true} onChange={onChange} />
      <p>{error}</p>
    </div>
  );
}
