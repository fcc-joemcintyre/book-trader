import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import queryString from 'query-string';
import { Box, Text } from 'uikit';
import { createTradeRequest, deleteTradeRequest } from '../../store/bookActions';
import { Header } from '../Header';
import { Book } from './Book';

export const HomePage = () => {
  const dispatch = useDispatch ();
  const user = useSelector ((state) => state.user);
  const books = useSelector ((state) => state.books);
  const location = useLocation ();
  const values = queryString.parse (location.search);
  const { owner, category } = values;

  let topMessage;
  if (!user.authenticated) {
    topMessage = (
      <Text as='p' m='0 10px 10px 10px' right>
        Login to add books and trade with others.
      </Text>
    );
  }

  const items = [];
  for (const book of books) {
    const include1 = owner ? book.ownerId === owner : true;
    const include2 = category ? book.category === category : true;
    if (include1 && include2) {
      items.push (
        <Book
          key={book._id}
          user={user}
          book={book}
          handleRequest={() => { dispatch (createTradeRequest (book)); }}
          handleCancelRequest={() => { dispatch (deleteTradeRequest (book)); }}
        />
      );
    }
  }

  return (
    <>
      <Header />
      <Box pt='10px' pb='10px'>
        { topMessage }
        <Box p='2px'>
          <Masonry elementType='div'>
            {items}
          </Masonry>
        </Box>
      </Box>
    </>
  );
};
