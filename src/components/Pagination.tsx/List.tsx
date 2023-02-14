import { Button } from '../Button';
import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

interface ListProps {
  itemsList: { id: string; item: string }[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onClickNextPage: MouseEventHandler<HTMLButtonElement>;
  onClickPreviousPage: MouseEventHandler<HTMLButtonElement>;
}

export function List(props: ListProps) {
  const navigate = useNavigate();

  return (
    <>
      <ul>
        {props.itemsList.map((item, index) => (
          <li key={index} onClick={() => navigate('/userDetails', { state: item.id })}>
            {item.item}
          </li>
        ))}
      </ul>
      <Button text='previous' type='button' disabled={!props.hasPreviousPage} onClick={props.onClickPreviousPage} />
      <Button text='next' type='button' disabled={!props.hasNextPage} onClick={props.onClickNextPage} />
    </>
  );
}
