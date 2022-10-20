import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { useLogoutMutation } from '../../store/api';
import { setAuthenticated } from '../../store/userSlice';

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
    <div className='container px-4 pt-8'>
      {isLoading ? (
        <p className='text-center'>
          Logging out ...
        </p>
      ) : (
        isError ? (
          <p className='text-center'>
            Logging out did not complete, please retry or close your browser.
          </p>
        ) : isSuccess ? (
          <p className='text-center'>
            Thank you for using BookTrader, we hope to see you back again soon.
          </p>
        ) : null
      )}
    </div>
  );
};
