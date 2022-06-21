import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import { Box, Text } from '@cygns/uikit';
import { Book } from '../../store/api';
import { useAppSelector } from '../../store/hooks';
import { Header } from '../header';
import { BookCard } from './BookCard';

export const HomePage = () => {
  const user = useAppSelector ((state) => state.user);
  const books = useAppSelector ((state) => state.books) as Book[];
  const location = useLocation ();
  const values = queryString.parse (location.search);
  const owner = Number (values.owner);
  const { category } = values;

  let topMessage;
  if (!user.authenticated) {
    topMessage = (
      <Text as='p' m='0 10px 10px 10px' right>
        Login to add books and trade with others.
      </Text>
    );
  }

  const items: JSX.Element[] = [];
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

  return (
    <>
      <Header />
      <Box pt='10px' pb='10px'>
        { topMessage }
        <Box p='2px'>
          <Grid>
            {items}
          </Grid>
        </Box>
      </Box>
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
