import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useGetBooksQuery } from '../../store/api';
import { useAppSelector } from '../../store/hooks';
import { BookCard } from './BookCard';

export const HomePage = () => {
  const user = useAppSelector ((state) => state.user);
  const { data: books, isLoading } = useGetBooksQuery ();

  const location = useLocation ();
  const values = queryString.parse (location.search);
  const owner = Number (values.owner);
  const { category } = values;

  let topMessage;
  if (!user.authenticated) {
    topMessage = (
      <p className='m-4 mt-0 text-right'>
        Login to add books and trade with others.
      </p>
    );
  }

  const items: JSX.Element[] = [];
  if (!isLoading && books) {
    for (const book of books) {
      const include1 = owner ? book.owner === owner : true;
      const include2 = category ? book.category === category : true;
      if (include1 && include2) {
        items.push (
          <BookCard
            key={book.key}
            book={book}
          />
        );
      }
    }
  }

  return (
    <div className='p-4 pt-8'>
      { topMessage }
      <div className='grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {items}
      </div>
    </div>
  );
};
