import { MouseEventHandler } from 'react';
import { ChangePageButton } from './ChangePageButton';

interface PageProps {
  itemsList: string[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onClickNextPage: MouseEventHandler<HTMLButtonElement>;
  onClickPreviousPage: MouseEventHandler<HTMLButtonElement>;
}

export function Page(props: PageProps) {
  return (
    <>
      <ul>
        {props.itemsList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ChangePageButton text='previous' disabled={!props.hasPreviousPage} onClick={props.onClickPreviousPage} />
      <ChangePageButton text='next' disabled={!props.hasNextPage} onClick={props.onClickNextPage} />
    </>
  );
}
