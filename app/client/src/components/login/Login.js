import { Fragment, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { createField, useFields } from 'use-fields';
import { MessageBox } from 'uikit';
import { isPassword } from '@cygns/validators';
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
  const [mb, setMB] = useState (null);

  const onSubmit = useCallback (async (e) => {
    e.preventDefault ();

    const errors = validateAll ();
    if (!errors) {
      setMB ({ content: 'Logging in' });
      try {
        const { username, password } = getValues ();
        const user = await login ({ username, password });
        await dispatch (setAuthenticated ({ authenticated: true, ...user.data }));
        onClose ();
      } catch (err) {
        setMB ({ actions: ['Ok'], closeAction: 'Ok', content: 'Error logging in' });
      }
    }
    return errors;
  }, [dispatch, getValues, login, onClose, setMB, validateAll]);

  const onCloseModal = useCallback (() => {
    setMB (null);
  }, [setMB]);

  return (
    <Fragment>
      <LoginForm
        fields={fields}
        onChange={onChange}
        onValidate={onValidate}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
      { mb && (
        <MessageBox
          actions={mb.actions}
          closeAction={mb.closeAction}
          content={mb.content}
          onClose={onCloseModal}
        />
      )}
    </Fragment>
  );
};

Login.propTypes = {
  onClose: PropTypes.func.isRequired,
};
