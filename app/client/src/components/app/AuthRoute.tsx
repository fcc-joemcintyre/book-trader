import { useNavigate } from 'react-router';
import { useAppSelector } from '../../store/hooks';
import { Login } from '../login';

type Props = {
  children: JSX.Element,
};

export const AuthRoute = ({ children }: Props): JSX.Element => {
  const authenticated = useAppSelector ((a) => a.user.authenticated);
  const navigate = useNavigate ();

  return (authenticated ?
    children :
    <Login onClose={() => navigate ('/')} />
  );
};
