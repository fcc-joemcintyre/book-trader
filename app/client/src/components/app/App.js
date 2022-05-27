import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { getTheme } from './theme';
import { GlobalStyle } from './GlobalStyle';
import { AuthRoute } from './AuthRoute';
import { Nav } from './Nav';
import { verifyLogin } from '../../store/userActions';
import { setBooks } from '../../store/bookActions';
import { ScrollToTop } from './ScrollToTop';

import { LoadingPage } from './LoadingPage';
import { HomePage } from '../home';
import { RequestPage } from '../request';
import { ManagePage } from '../manage';
import { ProfilePage } from '../user';
import { NotFoundPage } from './NotFoundPage';
import { AboutPage } from '../about';
import { LogoutPage } from '../logoutPage';

export const App = () => {
  const dispatch = useDispatch ();
  const themeName = useSelector ((a) => a.user.theme || 'base');
  const [loading, setLoading] = useState (true);
  const [message, setMessage] = useState ('Loading ...');

  useEffect (() => {
    (async () => {
      try {
        await dispatch (verifyLogin ());
        await dispatch (setBooks ());
        setLoading (false);
        setMessage ('');
      } catch (err) {
        setMessage ('Network error, try again.');
      }
    }) ();
  }, [dispatch]);

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
              <Route path='/requests' element={<AuthRoute><RequestPage /></AuthRoute>} />
              <Route path='/manage' element={<AuthRoute><ManagePage /></AuthRoute>} />
              <Route path='/profile' element={<AuthRoute><ProfilePage /></AuthRoute>} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/logout' element={<LogoutPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </Fragment>
        </ThemeProvider>
      </ScrollToTop>
    </BrowserRouter>
  );
};
