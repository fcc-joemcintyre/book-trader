import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageContent, Text } from 'uikit';
import { logout } from '../../store/userActions';
import { Header } from '../Header';

export const LogoutPage = () => {
  const [working, setWorking] = useState (true);
  const dispatch = useDispatch ();
  const authenticated = useSelector ((state) => state.user.authenticated);

  useEffect (() => {
    (async () => {
      await dispatch (logout ());
      setWorking (false);
    }) ();
  }, [dispatch]);

  return (
    <Fragment>
      <Header />
      <PageContent>
        { working ? (
          <Text as='p' center>
            Logging out ...
          </Text>
        ) : authenticated ? (
          <Text as='p' center>
            Logging out did not complete, please retry or close your browser.
          </Text>
        ) : (
          <Text as='p' center>
            Thank you for using BookTrader, we hope to see you back again soon.
          </Text>
        )}
      </PageContent>
    </Fragment>
  );
};
