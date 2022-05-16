import { Fragment, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createField, useFields } from 'use-fields';
import { MessageBox } from 'uikit';
import { isEmail } from 'validators';
import { updateProfile } from '../../store/userActions';
import { ProfileForm } from './ProfileForm';

const ProfilePageBase = ({ dispatch, iName, iEmail, iTheme }) => {
  const initialFields = useMemo (() => [
    createField ('name', iName, true),
    createField ('email', iEmail, false, [isEmail]),
    createField ('theme', iTheme, false),
  ], [iName, iEmail, iTheme]);

  const { fields, onChange, onValidate, getValues, validateAll } = useFields (initialFields);
  const [mb, setMB] = useState (null);

  const onSubmit = useCallback (async (e) => {
    e.preventDefault ();
    const errors = validateAll ();
    if (!errors) {
      setMB ({ content: 'Updating profile ...' });
      try {
        const { name, email, theme } = getValues ();
        await dispatch (updateProfile (name, email, theme));
        setMB ({ actions: ['Ok'], closeAction: 'Ok', content: 'Profile saved' });
      } catch (err) {
        setMB ({ actions: ['Close'], closeAction: 'Close', content: 'Error saving profile' });
      }
    }
    return errors;
  }, [dispatch, getValues, setMB, validateAll]);

  const onCloseModal = useCallback (() => {
    setMB (null);
  }, [setMB]);

  return (
    <Fragment>
      <ProfileForm
        fields={fields}
        onChange={onChange}
        onValidate={onValidate}
        onSubmit={onSubmit}
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

const mapStateToProps = ({ user }) => ({
  iName: user.name,
  iEmail: user.email,
  iTheme: user.theme || 'base',
});

export const ProfilePage = connect (mapStateToProps) (ProfilePageBase);

ProfilePageBase.propTypes = {
  iName: PropTypes.string.isRequired,
  iEmail: PropTypes.string.isRequired,
  iTheme: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
