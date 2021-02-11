import PropTypes from 'prop-types';
import { Route, useHistory } from 'react-router-dom';
import { LoginPage } from '../user';

export const AuthRoute = ({ authenticated, children, ...rest }) => {
  const history = useHistory ();
  return (
    <Route
      {...rest}
      render={() => (
        authenticated ? (
          children
        ) : (
          <LoginPage
            onLogin={() => { /* no op */ }}
            onCancel={() => history.push ('/')}
          />
        )
      )}
    />
  );
};

AuthRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
