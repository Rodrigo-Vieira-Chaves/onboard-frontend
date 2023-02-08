import { useEffect } from 'react';
import { InputStates } from './Form';

interface DropMenuProps {
  id: string;
  labelText: string;
  inputStates: InputStates;
  options: { value: string; option: string }[];
}

export function DropMenu(props: DropMenuProps) {
  const [inputStates, setInputStates] = props.inputStates;

  useEffect(() => {
    setInputStates({ ...inputStates, [props.id]: props.options[0].value });
  }, []);

  return (
    <>
      <label htmlFor={props.id}>{props.labelText}</label>
      <select onChange={(e) => setInputStates({ ...inputStates, [props.id]: e.target.value })}>
        {props.options.map((child, index) => (
          <option key={index} value={child.value}>
            {child.option}
          </option>
        ))}
      </select>
    </>
  );
}
