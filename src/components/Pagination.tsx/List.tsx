import { Button } from '../Button';
import { MouseEventHandler } from 'react';

interface ListProps {
  itemsList: string[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onClickNextPage: MouseEventHandler<HTMLButtonElement>;
  onClickPreviousPage: MouseEventHandler<HTMLButtonElement>;
}

export function List(props: ListProps) {
  return (
    <>
      <ul>
        {props.itemsList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <Button text='previous' type='button' disabled={!props.hasPreviousPage} onClick={props.onClickPreviousPage} />
      <Button text='next' type='button' disabled={!props.hasNextPage} onClick={props.onClickNextPage} />
    </>
  );
}
