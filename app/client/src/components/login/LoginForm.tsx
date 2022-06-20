import { Button, FieldInput, Flex, GridBox, GridBoxElement, Modal, Text } from '@cygns/uikit';
import { Field, FieldError } from '@cygns/use-fields';

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
  <Modal>
    <Text as='h1' center>Login</Text>
    <form
      noValidate
      onSubmit={async (e) => {
        const errors = await onSubmit (e);
        const el = document.getElementById (errors ? errors[0].name : username.name);
        if (el) { el.focus (); }
      }}
    >
      <GridBox w='300px' p='10px 10px 20px 10px' center>
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
        <GridBoxElement mt='20px' span={12} center>
          <Flex gap='6px'>
            <Button type='submit'>
              LOGIN
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
