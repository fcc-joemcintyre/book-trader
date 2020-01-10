import React from 'react';
import PropTypes from 'prop-types';
import { Button, FieldInput, Flex, GridBox, GridBoxElement, Modal, Text } from 'uikit';
import { createField, useFields } from 'use-fields';

export const EditBook = ({ book, onSave, onCancel }) => {
  const initial = [
    createField ('title', book ? book.title : '', true),
    createField ('category', book ? book.category : '', true),
    createField ('author', book ? book.author : '', true),
    createField ('cover', book ? book.cover : '', true),
  ];
  const { fields, getValues, onChange, onValidate, validateAll } = useFields (initial);

  function onSaveBook () {
    const errors = validateAll ();
    if (!errors) {
      const { title, category, author, cover } = getValues ();
      onSave ({ _id: book ? book._id : '', title, category, author, cover });
    }
    return errors;
  }

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

EditBook.propTypes = {
  book: PropTypes.shape ({
    _id: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    author: PropTypes.string,
    cover: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

EditBook.defaultProps = {
  book: null,
};
