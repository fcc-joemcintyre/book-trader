import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Box, Button, MessageBox, Text } from '@cygns/uikit';
import { Book } from '../../store/api';
import { saveBook, deleteBook } from '../../store/bookActions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Header } from '../header';
import { ManageBook } from './ManageBook';
import { EditBook } from './EditBook';

export const Manage = () => {
  const dispatch = useAppDispatch ();
  const books = useAppSelector ((state) => state.books) as Book[];
  const user = useAppSelector ((state) => state.user.key);
  const [mb, setMB] = useState<JSX.Element | null> (null);
  const [dialog, setDialog] = useState<JSX.Element | null> (null);

  const onClose = useCallback (() => {
    setMB (null);
  }, [setMB]);

  const onSave = useCallback (async (book) => {
    setMB (<MessageBox content='Saving book' />);
    try {
      await dispatch (saveBook (book));
      setMB (<MessageBox actions={['Close']} closeAction='Close' content='Book saved' onClose={onClose} />);
    } catch (err) {
      setMB (<MessageBox actions={['Close']} closeAction='Close' content='Error saving book' onClose={onClose} />);
    }
    setDialog (null);
  }, [dispatch, onClose, setMB]);

  const onEdit = useCallback ((book) => {
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

  const items: JSX.Element[] = [];
  for (const book of books) {
    if (book.owner === user) {
      items.push (
        <ManageBook
          key={book.key}
          book={book}
          onEditBook={onEdit}
          onDeleteBook={(key) => { dispatch (deleteBook (key)); }}
        />
      );
    }
  }

  return (
    <>
      <Header />
      <Box p='16px 8px 20px 8px'>
        <Text as='h2'>Your Books</Text>
        <Box mb='16px'>
          <Button
            type='button'
            onClick={onAdd}
          >
            Add Book
          </Button>
        </Box>
        <Grid>
          {items}
        </Grid>
      </Box>
      { mb }
      {dialog}
    </>
  );
};

const Grid = styled.div`
  display: grid;
  grid-gap: 8px;

  @media (max-width: 599px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 600px) and (max-width: 899px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
