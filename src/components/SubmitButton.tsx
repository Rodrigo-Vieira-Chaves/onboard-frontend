interface SubmitButtonProps {
  text: string;
  loading: boolean;
}

export function SubmitButton(props: SubmitButtonProps) {
  return <button type='submit'>{props.loading ? 'Carregando' : props.text}</button>;
}
