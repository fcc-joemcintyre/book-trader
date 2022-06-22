import { useCallback } from 'react';
import { Button, FieldInput, Flex, GridBox, GridBoxElement, Modal, Text } from '@cygns/uikit';
import { createField, useFields } from '@cygns/use-fields';
import { Book } from '../../store/api';

type Props = {
  book: Book | null,
  onSave: ({ key, category, title, author, cover }:
    { key: number, category: string, title: string, author: string, cover: string }) => void,
  onCancel: () => void,
};

export const EditBook = ({ book = null, onSave, onCancel }: Props) => {
  const initial = [
    createField ('title', book ? book.title : '', true),
    createField ('category', book ? book.category : '', true),
    createField ('author', book ? book.author : '', true),
    createField ('cover', book ? book.cover : '', true),
  ];
  const { fields, getValues, onChange, onValidate, validateAll } = useFields (initial);

  const onSaveBook = useCallback (() => {
    const errors = validateAll ();
    if (!errors) {
      const { category, title, author, cover } = getValues () as
        { category: string, title: string, author: string, cover: string };
      onSave ({ key: book ? book.key : 0, category, title, author, cover });
    }
    return errors;
  }, [book, getValues, onSave, validateAll]);

  return (
    <>
      <Modal top='50%'>
        <GridBox p='16px'>
          <GridBoxElement>
            <Text as='h4'>Book</Text>
          </GridBoxElement>
          <FieldInput
            field={fields.title}
            label='Title'
            autoFocus
            maxLength={60}
            onChange={onChange}
            onValidate={onValidate}
          />
          <FieldInput
            field={fields.category}
            label='Category'
            maxLength={20}
            onChange={onChange}
            onValidate={onValidate}
          />
          <FieldInput
            field={fields.author}
            label='Author'
            maxLength={30}
            onChange={onChange}
            onValidate={onValidate}
          />
          <FieldInput
            field={fields.cover}
            label='Cover (url)'
            maxLength={512}
            autoCapitalize='none'
            autoCorrect='off'
            onChange={onChange}
            onValidate={onValidate}
          />

          <Flex gap='8px'>
            <Button
              type='button'
              onClick={onSaveBook}
            >
              Save
            </Button>
            <Button
              type='button'
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Flex>
        </GridBox>
      </Modal>
    </>
  );
};
