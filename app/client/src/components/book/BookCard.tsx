import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../../store/api';
import { Button } from '../ui';

export type Action = {
  text: string,
  fn: (book: Book) => void,
};

type Props = {
  book: Book,
  actions?: Action[],
};

export const BookCard = ({ book, actions }: Props) => {
  const [cover, setCover] = useState<string | undefined> (book.cover);

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
      <div className='flex flex-col h-full w-full mx-2 py-1 justify-between'>
        <div>
          <div className='p-1 pb-2'>
            <span className='text-base'>{book.title}</span><br />
            <span className='text-sm'>{book.author}</span>
          </div>
          <hr className='m-2 bg-slate-200' />
          <div className='flex p-2 justify-between'>
            <Link to={`/?category=${book.category}`}>{book.category}</Link>
            <Link to={`/?owner=${book.owner}`}>{book.owner}</Link>
          </div>
        </div>
        {actions && actions.length > 0 && (
          <div className='flex space-x-2 justify-end'>
            {actions.map ((a) => (
              <Button
                key={a.text}
                type='button'
                size='sm'
                onClick={() => a.fn (book)}
              >
                {a.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
