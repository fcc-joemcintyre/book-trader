import { Dialog } from '@headlessui/react';
import { Field, FieldError } from '@cygns/use-fields';
import { Button, FieldInput } from '../ui';

type Props = {
  fields: {
    username: Field,
    password: Field,
  },
  onChange: React.ChangeEventHandler,
  onValidate: React.FocusEventHandler,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<FieldError[] | null>,
  onCancel: () => void,
}

const passwordErrors = {
  length: 'Must be 4+ characters',
  format: 'Invalid characters',
};

export const LoginForm = ({
  fields: { username, password },
  onChange, onValidate, onSubmit, onCancel,
}: Props) => (
  <Dialog open onClose={() => { /* no op */ }} as='div' className='relative z-30'>
    <div className='fixed inset-0 overflow-y-auto'>
      <div className='flex min-h-full items-center justify-center bg-cyan-200 bg-opacity-50'>
        <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 shadow-xl'>
          <Dialog.Title className='text-center'>Login</Dialog.Title>
          <form
            className='align-left'
            noValidate
            onSubmit={async (e) => {
              const errors = await onSubmit (e);
              const el = document.getElementById (errors ? errors[0].name : username.name);
              if (el) { el.focus (); }
            }}
          >
            <div className='grid grid-cols-12 gap-4 w-[300px] p-2 mx-auto'>
              <div className='col-span-12'>
                <FieldInput
                  field={username}
                  label='User name'
                  autoFocus
                  maxLength={20}
                  autoCapitalize='none'
                  autoCorrect='off'
                  info='Your user name'
                  onChange={onChange}
                  onValidate={onValidate}
                />
              </div>
              <div className='col-span-12'>
                <FieldInput
                  type='password'
                  field={password}
                  label='Password'
                  maxLength={20}
                  info='Your password'
                  errors={passwordErrors}
                  onChange={onChange}
                  onValidate={onValidate}
                />
              </div>
            </div>

            <div className='flex space-x-2 justify-center mt-8'>
              <Button type='submit'>
                LOGIN
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
