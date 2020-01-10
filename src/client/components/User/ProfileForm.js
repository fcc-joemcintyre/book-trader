import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, FieldInput, FieldSelect, GridBox, GridBoxElement, PageContent, Text } from 'uikit';
import { fieldPropTypes } from 'use-fields';
import { Header } from '../Header';

const emailErrors = {
  format: 'Invalid email address',
};

export const ProfileForm = ({ fields: { name, email, theme }, onChange, onValidate, onSubmit }) => (
  <Fragment>
    <Header />
    <PageContent>
      <Text as='h1' center>Profile</Text>
      <form
        onSubmit={async (e) => {
          const errors = await onSubmit (e);
          const el = document.getElementById (errors ? errors[0].name : name.name);
          if (el) { el.focus (); }
        }}
      >
        <GridBox w='300px' center>
          <FieldInput
            field={name}
            label='Name'
            autoFocus
            maxLength={40}
            info='Your name'
            onChange={onChange}
            onValidate={onValidate}
          />
          <FieldInput
            field={email}
            label='Email'
            maxLength={60}
            autoCapitalize='none'
            autoCorrect='off'
            info='Your email address'
            errors={emailErrors}
            onChange={onChange}
            onValidate={onValidate}
          />
          <FieldSelect
            field={theme}
            label='Theme'
            info='Pick a theme you like'
            onChange={onChange}
          >
            <option key='base' value='base'>Cyan</option>
            <option key='gray' value='gray'>Gray</option>
          </FieldSelect>

          <GridBoxElement span={12} center>
            <Button type='submit'>
              SAVE
            </Button>
          </GridBoxElement>
        </GridBox>
      </form>
    </PageContent>
  </Fragment>
);

ProfileForm.propTypes = {
  fields: PropTypes.shape ({
    name: PropTypes.shape (fieldPropTypes).isRequired,
    email: PropTypes.shape (fieldPropTypes).isRequired,
    theme: PropTypes.shape (fieldPropTypes).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
