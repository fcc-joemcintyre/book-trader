import { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { createField, useFields } from 'use-fields';
import { isEmail, isPassword } from '@cygns/validators';
import { useLoginMutation, useRegisterMutation } from '../../store/api';
import { useAppDispatch } from '../../store/hooks';
import { setAuthenticated } from '../../store/userSlice';
import { RegisterForm } from './RegisterForm';

function isNameChars (value) {
  const nameChars = /^[A-Za-z0-9]+$/;
  return nameChars.test (value) ? null : 'format';
}

function isPasswordChars (value) {
  const passwordChars = /^[A-Za-z0-9!@#$%^&*-+_=]+$/;
  return passwordChars.test (value) ? null : 'format';
}

function isMatch (value, fields) {
  const error = fields.password.value !== fields.verifyPassword.value ? 'matching' : null;
  const result = [
    { name: fields.password.name, error },
    { name: fields.verifyPassword.name, error },
  ];
  return result;
}

const initialFields = [
  createField ('email', '', true, [isEmail]),
  createField ('username', '', true, [isNameChars]),
  createField ('password', '', true, [isPassword, isPasswordChars]),
  createField ('verifyPassword', '', true, [isPassword, isPasswordChars]),
];


export const Register = ({ onClose }) => {
  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initialFields, [isMatch]);
  const navigate = useNavigate ();
  const dispatch = useAppDispatch ();
  const [register, { isLoading, isError, isSuccess }] = useRegisterMutation ();
  const [login, { isLoading: isLogin, isError: isLoginError }] = useLoginMutation ();

  const onSubmit = useCallback (async (e) => {
    e.preventDefault ();
    const errors = validateAll ();
    if (!errors) {
      const { email, username, password } = getValues ();
      await register ({ email, username, password });
      const user = await login ({ username, password });
      await dispatch (setAuthenticated (user));
      onClose ();
      navigate ('/', { replace: true });
    }
    return errors;
  }, [dispatch, getValues, login, navigate, onClose, register, validateAll]);

  return (
    <Fragment>
      <RegisterForm
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        isLogin={isLogin}
        isLoginError={isLoginError}
        fields={fields}
        onChange={onChange}
        onValidate={onValidate}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Fragment>
  );
};

Register.propTypes = {
  onClose: PropTypes.func.isRequired,
};
