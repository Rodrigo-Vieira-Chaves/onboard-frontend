interface ButtonProps {
  buttonText: string;
}

export function Button(props: ButtonProps) {
  return <button type='button'>{props.buttonText}</button>;
}
