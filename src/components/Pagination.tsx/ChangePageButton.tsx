import { MouseEventHandler } from 'react';

interface ChangePageButtonProps {
  disabled: boolean;
  text: 'next' | 'previous';
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function ChangePageButton(props: ChangePageButtonProps) {
  return (
    <button type='button' disabled={props.disabled} onClick={props.onClick}>
      {props.text}
    </button>
  );
}
