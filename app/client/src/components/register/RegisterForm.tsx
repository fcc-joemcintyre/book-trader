import { Dialog } from '@headlessui/react';
import { Field, FieldError } from '@cygns/use-fields';
import { Button, FieldInput } from '../ui';

type Props = {
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  isLogin: boolean,
  isLoginError: boolean,
  fields: {
    email: Field,
    username: Field,
    password: Field,
    verifyPassword: Field,
  },
  onChange: React.ChangeEventHandler,
  onValidate: React.FocusEventHandler,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<FieldError[] | null>,
  onCancel: () => void,
};

const emailErrors = {
  format: 'Must be valid email address',
};
const nameErrors = {
  format: 'Must be A-Z, a-z, 0-9',
};
const passwordErrors = {
  format: 'Must be A-Z, a-z, 0-9, !@#$%^&*()_+=',
  length: 'Must be 4+ characters long',
  matching: 'Password and verify password don\'t match',
};

export const RegisterForm = ({
  isLoading, isError, isSuccess, isLogin, isLoginError,
  fields: { email, username, password, verifyPassword },
  onChange, onValidate, onSubmit, onCancel,
}: Props) => (
  <Dialog open onClose={() => { /* no op */ }} as='div' className='relative z-30'>
    <div className='fixed inset-0 overflow-y-auto'>
      <div className='flex min-h-full items-center justify-center p-4 bg-cyan-200 bg-opacity-50'>
        <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl'>
          <Dialog.Title className='text-center'>Register</Dialog.Title>
          <form
            className='align-left'
            onSubmit={async (e) => {
              const errors = await onSubmit (e);
              const el = document.getElementById (errors ? errors[0].name : email.name);
              if (el) { el.focus (); }
            }}
          >
            <div className='grid grid-cols-12 gap-4 w-[300px] p-2 mx-auto'>
              <div className='col-span-full'>
                <p className='text-center'>
                  { isLoading ? 'Registering' :
                    isError ? 'Error, check entries and retry' :
                    isSuccess ? 'Registered successfully' :
                    isLogin ? 'Registered, logging in' :
                    isLoginError ? 'Registered, but failed to login.' :
                    'Enter information' }
                </p>
              </div>

              <div className='col-span-12'>
                <FieldInput
                  field={email}
                  label='Email'
                  autoFocus
                  maxLength={100}
                  autoCapitalize='none'
                  autoCorrect='off'
                  info='Your email address'
                  errors={emailErrors}
                  onChange={onChange}
                  onValidate={onValidate}
                />
              </div>
              <div className='col-span-12'>
                <FieldInput
                  field={username}
                  label='Screen name'
                  maxLength={20}
                  autoCapitalize='none'
                  autoCorrect='off'
                  info='Up to 20 characters (no spaces)'
                  errors={nameErrors}
                  onChange={onChange}
                  onValidate={onValidate}
                />
              </div>
              <div className='col-span-12'>
                <FieldInput
                  field={password}
                  label='Password'
                  type='password'
                  maxLength={20}
                  info='4 to 20 characters'
                  errors={passwordErrors}
                  onChange={onChange}
                  onValidate={onValidate}
                />
              </div>
              <div className='col-span-12'>
                <FieldInput
                  field={verifyPassword}
                  label='Verify Password'
                  type='password'
                  maxLength={20}
                  info='Re-type your password'
                  errors={passwordErrors}
                  onChange={onChange}
                  onValidate={onValidate}
                />
              </div>
            </div>

            <div className='flex space-x-2 justify-center mt-8'>
              <Button type='submit'>
                REGISTER
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
