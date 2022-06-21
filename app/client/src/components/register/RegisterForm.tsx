import { Button, FieldInput, Flex, GridBox, GridBoxElement, Modal, Text } from '@cygns/uikit';
import { Field, FieldError } from '@cygns/use-fields';

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
  <Modal>
    <Text as='h1' center>Register</Text>
    <form
      onSubmit={async (e) => {
        const errors = await onSubmit (e);
        const el = document.getElementById (errors ? errors[0].name : email.name);
        if (el) { el.focus (); }
      }}
    >
      <GridBox w='300px' p='10px 10px 20px 10px' center>
        <GridBoxElement span={12} center>
          <Text as='p' center>
            { isLoading ? 'Registering' :
              isError ? 'Error, check entries and retry' :
              isSuccess ? 'Registered successfully' :
              isLogin ? 'Registered, logging in' :
              isLoginError ? 'Registered, but failed to login.' :
              'Enter information' }
          </Text>
        </GridBoxElement>

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

        <GridBoxElement span={12} center>
          <Flex gap='6px'>
            <Button type='submit'>
              REGISTER
            </Button>
            <Button type='button' onClick={onCancel}>
              CANCEL
            </Button>
          </Flex>
        </GridBoxElement>
      </GridBox>
    </form>
  </Modal>
);
