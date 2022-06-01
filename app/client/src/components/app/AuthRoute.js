import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../store/hooks';
import { Login } from '../login';

export const AuthRoute = ({ children }) => {
  const authenticated = useAppSelector ((a) => a.user.authenticated);
  const navigate = useNavigate ();

  return (authenticated ?
    children :
    <Login onLogin={() => { /* no op */ }} onClose={() => navigate ('/')} />
  );
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
