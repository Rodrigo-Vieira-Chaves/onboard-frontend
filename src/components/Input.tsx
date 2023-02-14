import { useForm } from './Form';
import { useState } from 'react';
import { differenceInYears, isDate } from 'date-fns';
import styled from 'styled-components';

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
  value?: string;
  readonly?: boolean;
}

const StyledDiv = styled.div`
  display: flex;
  width: 240px;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  font-size: 12px;
  font-weight: regular;
  color: #777777;
  margin-bottom: 12px;
`;

const StyledInput = styled.input`
  border: 1px solid;
  color: #777777;
`;

const StyledParagraph = styled.p`
  font-size: 12px;
  font-weight: regular;
  color: red;
  margin-top: 8px;
`;

export function Input(props: InputProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const { updateInputData, updateValidators } = useForm();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError('');
    setInput(e.target.value);
    updateInputData(props.id, e.target.value);
  }

  function validate() {
    const isValid = input ? regexes[props.inputType](input) : true;

    if (!isValid) {
      setError(props.errorMessage);
    }

    return isValid;
  }

  updateValidators(props.id, validate);

  return (
    <StyledDiv>
      <StyledLabel htmlFor={props.id}>{props.labelText}</StyledLabel>
      <StyledInput
        id={props.id}
        type={props.inputType}
        required={props.required ?? true}
        value={props.value}
        readOnly={props.readonly}
        onChange={onChange}
      />
      <StyledParagraph>{error}</StyledParagraph>
    </StyledDiv>
  );
}
