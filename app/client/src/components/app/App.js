import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { useAppDispatch } from '../../store/hooks';
import { useVerifyLoginMutation } from '../../store/api';
import { setAuthenticated } from '../../store/userSlice';

import { getTheme } from './theme';
import { GlobalStyle } from './GlobalStyle';
import { AuthRoute } from './AuthRoute';
import { Nav } from './Nav';
import { setBooks } from '../../store/bookActions';
import { ScrollToTop } from './ScrollToTop';

import { LoadingPage } from './LoadingPage';
import { HomePage } from '../home';
import { Request } from '../request';
import { ManagePage } from '../manage';
import { NotFoundPage } from './NotFoundPage';
import { AboutPage } from '../about';
import { Logout } from '../logout';

export const App = () => {
  const dispatch = useDispatch ();
  const appDispatch = useAppDispatch ();
  const [verifyLogin] = useVerifyLoginMutation ();

  const themeName = useSelector ((a) => a.user.theme || 'base');
  const [loading, setLoading] = useState (true);
  const [message, setMessage] = useState ('Loading ...');

  useEffect (() => {
    (async () => {
      try {
        const user = await verifyLogin ().unwrap ();
        await appDispatch (setAuthenticated (user));
        await dispatch (setBooks ());
        setLoading (false);
        setMessage ('');
      } catch (err) {
        setMessage ('Network error, try again.');
      }
    }) ();
  }, [dispatch, appDispatch, verifyLogin]);

  const theme = getTheme (themeName);
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyle />
          <BrowserRouter>
            <Nav menu={false} />
          </BrowserRouter>
          <LoadingPage message={message} />
        </Fragment>
      </ThemeProvider>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop>
        <ThemeProvider theme={theme}>
          <Fragment>
            <GlobalStyle />
            <Nav menu />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/requests' element={<AuthRoute><Request /></AuthRoute>} />
              <Route path='/manage' element={<AuthRoute><ManagePage /></AuthRoute>} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </Fragment>
        </ThemeProvider>
      </ScrollToTop>
    </BrowserRouter>
  );
};
