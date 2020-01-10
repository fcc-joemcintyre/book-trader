import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Divider, Flex, Image, Text } from 'uikit';

export const ManageBook = ({ book, onEditBook, onDeleteBook }) => {
  const [cover, setCover] = useState (book.cover);
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
      <Text fs='14px'>{book.category}</Text>
      <Divider mt='8px' mb='8px' v='#dddddd' />
      <Flex gap='8px'>
        <Button
          type='button'
          onClick={() => onEditBook (book)}
        >
          Edit
        </Button>
        <Button
          type='button'
          onClick={() => onDeleteBook (book._id)}
        >
          Delete
        </Button>
      </Flex>
    </Card>
  );
};

ManageBook.propTypes = {
  book: PropTypes.shape ({
    _id: PropTypes.string,
    cover: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  onEditBook: PropTypes.func.isRequired,
  onDeleteBook: PropTypes.func.isRequired,
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
