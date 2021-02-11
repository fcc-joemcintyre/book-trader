import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Divider, Flex, FlexItem, Image, Text } from 'uikit';
import { createTradeRequest, deleteTradeRequest } from '../../store/bookActions';

export const Book = ({ book }) => {
  const [cover, setCover] = useState (book.cover);
  const dispatch = useDispatch ();
  const username = useSelector ((state) => state.user.username);

  let buttonArea;
  if ((username !== '') && (book.ownerId !== username)) {
    if (book.requesterId === username) {
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
    } else if (book.requesterId === '') {
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
              <Link to={`/?owner=${book.ownerId}`}>{book.owner}</Link>
            </Text>
          </FlexItem>
        </Flex>
        {buttonArea}
      </Box>
    </Flex>
  );
};

Book.propTypes = {
  book: PropTypes.shape ({
    requesterId: PropTypes.string,
    category: PropTypes.string,
    ownerId: PropTypes.string,
    cover: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};
