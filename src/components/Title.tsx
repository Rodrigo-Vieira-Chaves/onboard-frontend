interface TitleProps {
  titleText: string;
}

export function Title(props: TitleProps) {
  return <h1>{props.titleText}</h1>;
}
