import { useCallback, useState } from 'react';
import { Book, useCreateBookMutation, useDeleteBookMutation, useGetBooksQuery, useUpdateBookMutation } from '../../store/api';
import { useAppSelector } from '../../store/hooks';
import { BookCard } from '../book/BookCard';
import { Button, MessageBox } from '../ui';
import { EditBook } from './EditBook';

export const Manage = () => {
  const user = useAppSelector ((state) => state.user.key);
  const { data: books, isLoading } = useGetBooksQuery ();
  const [createBook] = useCreateBookMutation ();
  const [deleteBook] = useDeleteBookMutation ();
  const [updateBook] = useUpdateBookMutation ();
  const [mb, setMB] = useState<JSX.Element | null> (null);
  const [dialog, setDialog] = useState<JSX.Element | null> (null);

  const onClose = useCallback (() => {
    setMB (null);
  }, [setMB]);

  const onSave = useCallback (async (book: Book) => {
    setMB (<MessageBox content='Saving book' />);
    try {
      if (book.key === 0) {
        await createBook (book);
      } else {
        await updateBook (book);
      }
      setMB (<MessageBox actions={['Close']} closeAction='Close' content='Book saved' onClose={onClose} />);
    } catch (err) {
      setMB (<MessageBox actions={['Close']} closeAction='Close' content='Error saving book' onClose={onClose} />);
    }
    setDialog (null);
  }, [createBook, onClose, setMB, updateBook]);

  const onEdit = useCallback ((book: Book | null) => {
    setDialog (
      <EditBook
        book={book}
        onSave={onSave}
        onCancel={() => setDialog (null)}
      />
    );
  }, [onSave, setDialog]);

  const onAdd = useCallback (() => {
    onEdit (null);
  }, [onEdit]);

  const onDelete = useCallback ((book: Book) => {
    deleteBook ({ key: book.key });
  }, [deleteBook]);

  const items: JSX.Element[] = [];
  if (!isLoading && books) {
    for (const book of books) {
      if (book.owner === user) {
        items.push (
          <BookCard
            key={book.key}
            book={book}
            actions={[
              { text: 'Edit', fn: onEdit },
              { text: 'Delete', fn: onDelete },
            ]}
          />
        );
      }
    }
  }

  return (
    <>
      <div className='p-4 pt-8'>
        <div className='flex justify-between'>
          <h1>Your Books</h1>
          <Button
            type='button'
            onClick={onAdd}
          >
            Add Book
          </Button>
        </div>
        <div className='grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {items}
        </div>
      </div>
      {mb}
      {dialog}
    </>
  );
};
