import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { LoginPage } from '../user';

export const AuthRoute = ({ children }) => {
  const authenticated = useSelector ((a) => a.user.authenticated);
  const navigate = useNavigate ();

  return (authenticated ?
    children :
    <LoginPage onLogin={() => { /* no op */ }} onClose={() => navigate ('/')} />
  );
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
