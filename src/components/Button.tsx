import { MouseEventHandler } from 'react';

interface ButtonProps {
  text: string;
  disabled?: boolean;
  type: 'submit' | 'reset' | 'button';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Button(props: ButtonProps) {
  return (
    <button type={props.type} disabled={props.disabled} onClick={props.onClick}>
      {props.text}
    </button>
  );
}
