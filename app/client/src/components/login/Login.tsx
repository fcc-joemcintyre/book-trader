import { Fragment, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { isPassword } from '@cygns/validators';
import { createField, useFields } from '@cygns/use-fields';
import { MessageBox } from '@cygns/uikit';
import { useLoginMutation } from '../../store/api';
import { useAppDispatch } from '../../store/hooks';
import { setAuthenticated } from '../../store/userSlice';
import { LoginForm } from './LoginForm';

const initialFields = [
  createField ('username', '', true, []),
  createField ('password', '', true, [isPassword]),
];

export const Login = ({ onClose }) => {
  const dispatch = useAppDispatch ();
  const [login] = useLoginMutation ();

  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initialFields);
  const [dialog, setDialog] = useState<JSX.Element | null> (null);

  const onCloseModal = useCallback (() => {
    setDialog (null);
  }, [setDialog]);

  const onSubmit = useCallback (async (e) => {
    e.preventDefault ();

    const errors = validateAll ();
    if (!errors) {
      setDialog (<MessageBox content='Logging in' />);
      try {
        const { username, password } = getValues () as { username: string, password: string};
        if (username && password) {
          const user = await login ({ username, password }).unwrap ();
          if (user) {
            await dispatch (setAuthenticated ({ ...user, authenticated: true }));
          }
        }
        onClose ();
      } catch (err) {
        setDialog (
          <MessageBox
            actions={['Ok']}
            closeAction='Ok'
            content='Error logging in'
            onClose={onCloseModal}
          />
        );
      }
    }
    return errors;
  }, [dispatch, getValues, login, onClose, onCloseModal, setDialog, validateAll]);

  return (
    <Fragment>
      <LoginForm
        fields={{
          username: fields.username,
          password: fields.password,
        }}
        onChange={onChange}
        onValidate={onValidate}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
      {dialog}
    </Fragment>
  );
};

Login.propTypes = {
  onClose: PropTypes.func.isRequired,
};
