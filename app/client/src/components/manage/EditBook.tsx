import { useCallback } from 'react';
import { Dialog } from '@headlessui/react';
import { createField, useFields } from '@cygns/use-fields';
import { Book } from '../../store/api';
import { Button, FieldInput } from '../ui';

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
    <Dialog open onClose={() => { /* no op */ }} as='div' className='relative z-30'>
      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 bg-cyan-200 bg-opacity-50'>
          <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl'>
            <Dialog.Title className='text-center'>{book ? 'Edit' : 'Create'} Book</Dialog.Title>
            <form className='align-left'>
              <div className='grid grid-cols-12 gap-4 p-2 mx-auto'>
                <div className='col-span-12'>
                  <FieldInput
                    field={fields.title}
                    label='Title'
                    autoFocus
                    maxLength={60}
                    onChange={onChange}
                    onValidate={onValidate}
                  />
                </div>
                <div className='col-span-6'>
                  <FieldInput
                    field={fields.category}
                    label='Category'
                    maxLength={20}
                    onChange={onChange}
                    onValidate={onValidate}
                  />
                </div>
                <div className='col-span-12'>
                  <FieldInput
                    field={fields.author}
                    label='Author'
                    maxLength={30}
                    onChange={onChange}
                    onValidate={onValidate}
                  />
                </div>
                <div className='col-span-12'>
                  <FieldInput
                    field={fields.cover}
                    label='Cover (url)'
                    maxLength={512}
                    autoCapitalize='none'
                    autoCorrect='off'
                    onChange={onChange}
                    onValidate={onValidate}
                  />
                </div>
              </div>

              <div className='flex space-x-2 justify-center mt-8'>
                <Button type='button' onClick={onSaveBook}>
                  Save
                </Button>
                <Button type='button' onClick={onCancel}>
                  CANCEL
                </Button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
