import styled from 'styled-components';
import { MouseEventHandler } from 'react';

interface ButtonProps {
  text: string;
  disabled?: boolean;
  type: 'submit' | 'reset' | 'button';
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  margins?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const StyledButton = styled.button.attrs((props: ButtonProps) => props)`
  font-size: ${(props) => props.fontSize ?? '16px'};
  font-weight: ${(props) => props.fontWeight ?? 'regular'};
  color: ${(props) => props.color ?? 'black'};
  background-color: ${(props) => props.color ?? '#2596be'};
  height: 44px;
`;

export function Button(props: ButtonProps) {
  return (
    <StyledButton type={props.type} disabled={props.disabled} onClick={props.onClick}>
      {props.text}
    </StyledButton>
  );
}
