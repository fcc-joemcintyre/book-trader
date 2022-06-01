import PropTypes from 'prop-types';
import { Button, FieldInput, Flex, GridBox, GridBoxElement, Modal, Text } from '../../../libs/uikit';
import { fieldPropTypes } from '../../../libs/use-fields';

const passwordErrors = {
  length: 'Must be 4+ characters',
  format: 'Invalid characters',
};

export const LoginForm = ({ fields: { username, password }, onChange, onValidate, onSubmit, onCancel }) => (
  <Modal>
    <Text as='h1' center>Login</Text>
    <form
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

LoginForm.propTypes = {
  fields: PropTypes.shape ({
    username: PropTypes.shape (fieldPropTypes).isRequired,
    password: PropTypes.shape (fieldPropTypes).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
