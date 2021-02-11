import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Flex, Image, Text } from 'uikit';

export const ManageBook = ({ book, onEditBook, onDeleteBook }) => {
  const [cover, setCover] = useState (book.cover);
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
          <Text fs='14px'>{book.category}</Text>
        </Box>
        <Divider c='#dddddd' />
        <Flex mt='8px' gap='8px' style={{ justifyContent: 'flex-end' }}>
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
      </Box>
    </Flex>
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
