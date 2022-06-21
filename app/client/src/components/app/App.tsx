import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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

import { Loading } from './Loading';
import { HomePage } from '../home';
import { Request } from '../request';
import { ManagePage } from '../manage';
import { NotFound } from './NotFound';
import { About } from '../about';
import { Logout } from '../logout';

export const App = () => {
  const dispatch = useDispatch ();
  const appDispatch = useAppDispatch ();
  const [verifyLogin] = useVerifyLoginMutation ();

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

  const theme = getTheme ();
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <BrowserRouter>
            <Nav menu={false} />
          </BrowserRouter>
          <Loading message={message} />
        </>
      </ThemeProvider>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Nav menu />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/requests' element={<AuthRoute><Request /></AuthRoute>} />
              <Route path='/manage' element={<AuthRoute><ManagePage /></AuthRoute>} />
              <Route path='/about' element={<About />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </>
        </ThemeProvider>
      </ScrollToTop>
    </BrowserRouter>
  );
};
