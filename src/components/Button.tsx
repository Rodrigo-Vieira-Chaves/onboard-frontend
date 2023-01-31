interface ButtonProps {
  buttonText: string;
}

export function Button(props: ButtonProps) {
  return <button type='submit'>{props.buttonText}</button>;
}
