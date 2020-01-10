import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Box, Button, Divider, Flex, FlexItem, Image, Text } from 'uikit';
import { createTradeRequest, deleteTradeRequest } from '../../store/bookActions';

export const Book = ({ book }) => {
  const [cover, setCover] = useState (book.cover);
  const dispatch = useDispatch ();
  const username = useSelector (state => state.user.username);

  let buttonArea;
  if ((username !== '') && (book.ownerId !== username)) {
    if (book.requesterId === username) {
      buttonArea = (
        <Box mt='10px' align='right'>
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
        <Box mt='10px' align='right'>
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
    <Card>
      <Image
        src={cover}
        onError={() => {
          setCover (`${location.origin}/images/image404-75.png`);
        }}
      />
      <Text fs='16px' pt='8px'>{book.title}</Text>
      <Text fs='14px'>{book.author}</Text>
      <Divider mt='8px' mb='8px' v='#dddddd' />
      <Flex>
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
    </Card>
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

const Card = styled.div`
  border: 1px solid #dddddd;
  border-radius: 4px;

  @media (max-width: 414px) {
    width: 44%;
    margin: 1%;
    padding: 1%;
  }

  @media (min-width: 415px) and (max-width: 768px) {
    width: 30%;
    margin: 0.75%;
    padding: 0.75%;
  }

  @media (min-width: 769px) {
    width: 22.5%;
    margin: 0.5%;
    padding: 0.5%;
  }
`;
