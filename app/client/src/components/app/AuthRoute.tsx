import { useNavigate } from 'react-router';
import { useAppSelector } from '../../store/hooks';
import { Login } from '../login';

type Props = {
  children: React.ReactNode,
};

export const AuthRoute = ({ children }: Props) => {
  const authenticated = useAppSelector ((a) => a.user.authenticated);
  const navigate = useNavigate ();

  return (authenticated ?
    children :
    <Login onClose={() => navigate ('/')} />
  );
};
