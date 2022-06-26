import { useEffect } from 'react';
import { useLocation } from 'react-router';

type Props = {
  children: JSX.Element,
};

export const ScrollToTop = ({ children }: Props) => {
  const { pathname, search } = useLocation ();
  useEffect (() => {
    window.scrollTo (0, 0);
  }, [pathname, search]);
  return children || null;
};
