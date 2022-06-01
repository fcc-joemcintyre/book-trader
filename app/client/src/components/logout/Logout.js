import { useEffect } from 'react';
import { PageContent, Text } from '../../../libs/uikit';
import { useAppDispatch } from '../../store/hooks';
import { useLogoutMutation } from '../../store/api';
import { setAuthenticated } from '../../store/userSlice';
import { Header } from '../header';

export const Logout = () => {
  const dispatch = useAppDispatch ();
  const [logout, { isLoading, isError, isSuccess }] = useLogoutMutation ();

  useEffect (() => {
    async function q () {
      await logout ();
      dispatch (setAuthenticated ({ authenticated: false, key: 0, username: '', email: '' }));
    }
    q ();
  }, [dispatch, logout]);

  return (
    <>
      <Header />
      <PageContent>
        {isLoading ? (
          <Text as='p' center>
            Logging out ...
          </Text>
        ) : (
          isError ? (
            <Text as='p' center>
              Logging out did not complete, please retry or close your browser.
            </Text>
          ) : isSuccess ? (
            <Text as='p' center>
              Thank you for using BookTrader, we hope to see you back again soon.
            </Text>
          ) : null
        )}
      </PageContent>
    </>
  );
};
