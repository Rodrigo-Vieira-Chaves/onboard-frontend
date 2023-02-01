interface ButtonProps {
  text: string;
  loading: boolean;
}

export function Button(props: ButtonProps) {
  return <button type='submit'>{props.loading ? 'Carregando' : props.text}</button>;
}
