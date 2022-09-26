import { useState } from 'react';
import { Box, Button, Divider, Flex, Image, Text } from '@cygns/uikit';
import { Book } from '../../store/api';

type Props = {
  book: Book,
  onEditBook: (book: Book) => void,
  onDeleteBook: (key: number) => void,
};

export const ManageBook = ({ book, onEditBook, onDeleteBook }: Props) => {
  const [cover, setCover] = useState<string | undefined> (book.cover);
  return (
    <Flex b='1px solid #dddddd' br='4px'>
      { cover ? (
        <Image
          src={cover}
          h='auto'
          w='70px'
          crossOrigin='anonymous'
          onError={() => {
            setCover (undefined);
          }}
        />
      ) : (
        <Box inline h='70px' w='70px' bg='lightsteelblue' />
      )}
      <Box inline ml='8px' pt='4px' pb='4px' w='calc(100%-70px)'>
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
            onClick={() => onDeleteBook (book.key)}
          >
            Delete
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
