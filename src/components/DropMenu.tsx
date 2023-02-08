import { useForm } from './Form';
import { useState } from 'react';

interface DropMenuProps {
  id: string;
  labelText: string;
  errorMessage: string;
  options: { value: string; option: string }[];
}

export function DropMenu(props: DropMenuProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const { updateInputData, updateValidators } = useForm();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setError('');
    setInput(e.target.value);
    updateInputData(props.id, e.target.value);
  }

  function validate() {
    const isValid = input.length > 0;

    if (!isValid) {
      setError(props.errorMessage);
    }
    return isValid;
  }

  updateValidators(props.id, validate);

  return (
    <>
      <label htmlFor={props.id}>{props.labelText}</label>
      <select onChange={onChange}>
        {props.options.map((child, index) => (
          <option key={index} value={child.value}>
            {child.option}
          </option>
        ))}
      </select>
      <p>{error}</p>
    </>
  );
}
