import { cloneElement, createContext, useContext } from 'react';

type Validators = { [id: string]: () => boolean };
export type InputsData = { [id: string]: string };

const validators: Validators = {};
const inputsData: InputsData = {};

interface FormProps {
  children: JSX.Element[];
  onSubmit: (inputsData: InputsData) => void;
}

const FormContext = createContext({ validators, inputsData });

export function useForm() {
  const { validators, inputsData } = useContext(FormContext);

  const updateInputData = (inputId: string, data: string) => {
    inputsData[inputId] = data;
  };

  const updateValidators = (inputId: string, validator: () => boolean) => {
    validators[inputId] = validator;
  };

  return { updateInputData, updateValidators, inputsData };
}

export function Form(props: FormProps) {
  function validateForms() {
    let areInputsValid = true;

    for (const key in validators) {
      areInputsValid &&= validators[key]();
    }

    return areInputsValid;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (validateForms()) {
      return props.onSubmit(inputsData);
    }
  }

  return <form onSubmit={onSubmit}>{props.children.map((child, index) => cloneElement(child, { key: index }))}</form>;
}
