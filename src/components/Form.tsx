import { cloneElement, createContext, FormEvent } from 'react';

export type States = { [id: string]: string };
export type Validators = { [id: string]: () => boolean };
export type InputStates = [States, React.Dispatch<React.SetStateAction<States>>];

interface FormProps {
  action: string;
  method: string;
  children: JSX.Element[];
  inputStates: InputStates;
  shouldValidateForms?: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const FormContext = createContext<{ validators: Validators; inputStates: InputStates }>({} as any);

export function Form(props: FormProps) {
  const validators: Validators = {};

  function validateForms(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let areInputsValid = true;

    for (const key in validators) {
      areInputsValid &&= validators[key]();
    }

    return areInputsValid;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (props.shouldValidateForms ? validateForms(e) : true) {
      return props.onSubmit(e);
    }
  }

  return (
    <FormContext.Provider value={{ validators, inputStates: props.inputStates }}>
      <form action={props.action} method={props.method} onSubmit={onSubmit}>
        {props.children.map((child, index) => cloneElement(child, { key: index }))}
      </form>
    </FormContext.Provider>
  );
}
