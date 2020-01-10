import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createField, useFields } from 'use-fields';
import { MessageBox } from 'uikit';
import { isPassword } from 'validators';
import { login } from '../../store/userActions';
import { LoginForm } from './LoginForm';

const initialFields = [
  createField ('username', '', true, []),
  createField ('password', '', true, [isPassword]),
];

const LoginPageBase = ({ onClose, dispatch }) => {
  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initialFields);
  const [mb, setMB] = useState (null);

  async function onSubmit (e) {
    e.preventDefault ();

    const errors = validateAll ();
    if (!errors) {
      setMB ({ content: 'Logging in' });
      try {
        const { username, password } = getValues ();
        await dispatch (login (username, password));
        onClose ();
      } catch (err) {
        setMB ({ actions: ['Ok'], closeAction: 'Ok', content: 'Error logging in' });
      }
    }
    return errors;
  }

  function onCloseModal () {
    setMB (null);
  }

  return (
    <Fragment>
      <LoginForm
        fields={fields}
        onChange={onChange}
        onValidate={onValidate}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
      { mb &&
        <MessageBox
          actions={mb.actions}
          closeAction={mb.closeAction}
          content={mb.content}
          onClose={onCloseModal}
        />
      }
    </Fragment>
  );
};


export const LoginPage = connect (null) (LoginPageBase);

LoginPageBase.propTypes = {
  onClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};
