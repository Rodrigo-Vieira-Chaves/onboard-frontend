import styled from 'styled-components';

interface TitleProps {
  titleText: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  margins?: string;
}

const StyledTitle = styled.h1.attrs((props: TitleProps) => props)`
  font-size: ${(props) => props.fontSize ?? '24px'};
  font-weight: ${(props) => props.fontWeight ?? 'bold'};
  color: ${(props) => props.color ?? 'black'};
  margin: ${(props) => props.margins ?? '20px top, 20px bottom'};
`;

export function Title(props: TitleProps) {
  return <StyledTitle>{props.titleText}</StyledTitle>;
}
