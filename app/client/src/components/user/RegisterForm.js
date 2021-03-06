import PropTypes from 'prop-types';
import { Button, FieldInput, Flex, GridBox, GridBoxElement, Modal, Text } from 'uikit';
import { fieldPropTypes } from 'use-fields';

const nameErrors = {
  format: 'Must be A-Z, a-z, 0-9',
};
const passwordErrors = {
  format: 'Must be A-Z, a-z, 0-9, !@#$%^&*()_+=',
  length: 'Must be 4+ characters long',
  matching: 'Password and verify password don\'t match',
};

export const RegisterForm = ({
  fields: { username, password, verifyPassword },
  onChange, onValidate, onSubmit, onCancel,
}) => (
  <Modal>
    <Text as='h1' center>Register</Text>
    <form
      onSubmit={async (e) => {
        const errors = await onSubmit (e);
        const el = document.getElementById (errors ? errors[0].name : name.name);
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

RegisterForm.propTypes = {
  fields: PropTypes.shape ({
    username: PropTypes.shape (fieldPropTypes).isRequired,
    password: PropTypes.shape (fieldPropTypes).isRequired,
    verifyPassword: PropTypes.shape (fieldPropTypes).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
