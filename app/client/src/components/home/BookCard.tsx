import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, useCreateTradeRequestMutation, useDeleteTradeRequestMutation } from '../../store/api';
import { useAppSelector } from '../../store/hooks';
import { Button } from '../ui';

type Props = {
  book: Book,
};

export const BookCard = ({ book }: Props) => {
  const [cover, setCover] = useState<string | undefined> (book.cover);
  const user = useAppSelector ((state) => state.user.key || 0);
  const [createTradeRequest] = useCreateTradeRequestMutation ();
  const [deleteTradeRequest] = useDeleteTradeRequestMutation ();

  let buttonArea;
  if ((user !== 0) && (book.owner !== user)) {
    if (book.requester === user) {
      buttonArea = (
        <div className='mt-2 pr-1 text-right'>
          <Button
            type='button'
            onClick={() => { deleteTradeRequest ({ key: book.key }); }}
          >
            Cancel Request
          </Button>
        </div>
      );
    } else if (book.requester === 0) {
      buttonArea = (
        <div className='mt-2 pr-1 text-right'>
          <Button
            type='button'
            onClick={() => { createTradeRequest ({ key: book.key }); }}
          >
            Request Book
          </Button>
        </div>
      );
    }
  }

  return (
    <div className='flex items-center border border-slate-600 rounded-md'>
      { cover ? (
        <img
          src={cover}
          height='auto'
          width='70px'
          className='object-contain'
          crossOrigin='anonymous'
          onError={() => {
            setCover (undefined);
          }}
        />
      ) : (
        <div className='h-[70px] w-[70px] bg-blue-100' />
      )}
      <div className='w-full ml-2 py-1'>
        <div className='p-1 pb-2'>
          <span className='text-base'>{book.title}</span><br />
          <span className='text-sm'>{book.author}</span>
        </div>
        <hr className='m-2 bg-slate-200' />
        <div className='flex p-2 justify-between'>
          <Link to={`/?category=${book.category}`}>{book.category}</Link>
          <Link to={`/?owner=${book.owner}`}>{book.owner}</Link>
        </div>
        {buttonArea}
      </div>
    </div>
  );
};
