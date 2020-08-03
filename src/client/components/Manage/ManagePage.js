import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Box, Button, MessageBox, Text } from 'uikit';
import { saveBook, deleteBook } from '../../store/bookActions';
import { Header } from '../Header';
import { ManageBook } from './ManageBook';
import { EditBook } from './EditBook';

export const ManagePage = () => {
  const dispatch = useDispatch ();
  const books = useSelector ((state) => state.books);
  const user = useSelector ((state) => state.user.id);
  const [mb, setMB] = useState (null);
  const [dialog, setDialog] = useState (null);

  function onAdd () {
    onEdit (null);
  }

  function onEdit (book) {
    setDialog (
      <EditBook
        book={book}
        onSave={onSave}
        onCancel={() => setDialog (null)}
      />
    );
  }

  async function onSave (book) {
    setMB ({ content: 'Saving book' });
    try {
      await dispatch (saveBook (book));
      setMB ({ actions: ['Close'], closeAction: 'Close', content: 'Book saved' });
    } catch (err) {
      setMB ({ actions: ['Close'], closeAction: 'Close', content: 'Error saving book' });
    }
    setDialog (null);
  }

  const items = [];
  for (const book of books) {
    if (book.ownerId === user) {
      items.push (
        <ManageBook
          key={book._id}
          book={book}
          onEditBook={onEdit}
          onDeleteBook={(bookId) => { dispatch (deleteBook (bookId)); }}
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
      { mb && (
        <MessageBox
          actions={mb.actions}
          closeAction={mb.closeAction}
          content={mb.content}
          onClose={() => setMB (null)}
        />
      )}
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
