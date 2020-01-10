import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'uikit';
import { Header } from '../Header';

export const LoadingPage = ({ message }) => (
  <Fragment>
    <Header />
    <Text center>{message}</Text>
  </Fragment>
);

LoadingPage.propTypes = {
  message: PropTypes.string.isRequired,
};
