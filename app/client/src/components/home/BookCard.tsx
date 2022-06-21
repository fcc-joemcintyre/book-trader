import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Divider, Flex, FlexItem, Image, Text } from '@cygns/uikit';
import { Book } from '../../store/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createTradeRequest, deleteTradeRequest } from '../../store/bookActions';

type Props = {
  book: Book,
};

export const BookCard = ({ book }: Props) => {
  const [cover, setCover] = useState (book.cover);
  const dispatch = useAppDispatch ();
  const user = useAppSelector ((state) => state.user.key || 0);
  let buttonArea;
  if ((user !== 0) && (book.owner !== user)) {
    if (book.requester === user) {
      buttonArea = (
        <Box mt='10px' pr='4px' align='right'>
          <Button
            type='button'
            onClick={() => { dispatch (deleteTradeRequest (book)); }}
          >
            Cancel Request
          </Button>
        </Box>
      );
    } else if (book.requester === 0) {
      buttonArea = (
        <Box mt='10px' pr='4px' align='right'>
          <Button
            type='button'
            onClick={() => {
              dispatch (createTradeRequest (book));
            }}
          >
            Request Book
          </Button>
        </Box>
      );
    }
  }

  return (
    <Flex b='1px solid #dddddd' br='4px'>
      <Image
        src={cover}
        h='80px'
        w='auto'
        crossOrigin='anonymous'
        onError={() => {
          setCover (`${location.origin}/images/image404-75.png`);
        }}
      />
      <Box inline ml='8px' pt='4px' pb='4px' w='100%'>
        <Box p='4px 4px 8px 4px'>
          <Text fs='16px'>{book.title}</Text>
          <Text fs='14px'>{book.author}</Text>
        </Box>
        <Divider c='#dddddd' />
        <Flex p='8px 4px 4px 4px'>
          <FlexItem grow shrink>
            <Text as='span' left>
              <Link to={`/?category=${book.category}`}>{book.category}</Link>
            </Text>
          </FlexItem>
          <FlexItem>
            <Text as='span' right>
              <Link to={`/?owner=${book.owner}`}>{book.owner}</Link>
            </Text>
          </FlexItem>
        </Flex>
        {buttonArea}
      </Box>
    </Flex>
  );
};
