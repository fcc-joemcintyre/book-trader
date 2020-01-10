import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { getTheme } from './theme';
import { GlobalStyle } from './GlobalStyle';
import { AuthRoute } from './AuthRoute';
import { Nav } from './Nav';
import { verifyLogin } from '../../store/userActions';
import { setBooks } from '../../store/bookActions';
import { ScrollToTop } from './ScrollToTop';

import { LoadingPage } from './LoadingPage';
import { HomePage } from '../Home';
import { RequestPage } from '../Request';
import { ManagePage } from '../Manage';
import { ProfilePage } from '../User';
import { NotFoundPage } from './NotFoundPage';
import { AboutPage } from '../About';
import { LogoutPage } from '../LogoutPage';

const AppBase = ({ themeName, authenticated, dispatch }) => {
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
  }, []);

  const theme = getTheme (themeName);
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyle />
          <Nav menu={false} />
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
            <Switch>
              <Route exact path='/'><HomePage /></Route>
              <AuthRoute exact path='/requests' authenticated={authenticated}><RequestPage /></AuthRoute>
              <AuthRoute exact path='/manage' authenticated={authenticated}><ManagePage /></AuthRoute>
              <AuthRoute exact path='/profile' authenticated={authenticated}><ProfilePage /></AuthRoute>
              <Route exact path='/about'><AboutPage /></Route>
              <Route exact path='/logout'><LogoutPage /></Route>
              <Route path='*'><NotFoundPage /></Route>
            </Switch>
          </Fragment>
        </ThemeProvider>
      </ScrollToTop>
    </BrowserRouter>
  );
};


const mapStateToProps = ({ user }) => ({
  authenticated: user.authenticated,
  themeName: user.theme || 'base',
});

export const App = connect (mapStateToProps) (AppBase);

AppBase.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  themeName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
