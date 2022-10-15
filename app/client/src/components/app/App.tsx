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
import { ScrollToTop } from './ScrollToTop';

import { HomePage } from '../home';
import { Request } from '../request';
import { Manage } from '../manage';
import { NotFound } from './NotFound';
import { About } from '../about';
import { Logout } from '../logout';

export const App = () => {
  const dispatch = useDispatch ();
  const appDispatch = useAppDispatch ();
  const [verifyLogin] = useVerifyLoginMutation ();

  const [loading, setLoading] = useState (true);

  useEffect (() => {
    (async () => {
      try {
        const user = await verifyLogin ().unwrap ();
        await appDispatch (setAuthenticated (user));
      } finally {
        setLoading (false);
      }
    }) ();
  }, [dispatch, appDispatch, verifyLogin]);

  const theme = getTheme ();
  return (
    <BrowserRouter>
      <ScrollToTop>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            { !loading && (
              <>
                <Nav />
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/requests' element={<AuthRoute><Request /></AuthRoute>} />
                  <Route path='/manage' element={<AuthRoute><Manage /></AuthRoute>} />
                  <Route path='/about' element={<About />} />
                  <Route path='/logout' element={<Logout />} />
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </>
            )}
          </>
        </ThemeProvider>
      </ScrollToTop>
    </BrowserRouter>
  );
};
