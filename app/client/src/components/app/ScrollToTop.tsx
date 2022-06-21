import { useEffect } from 'react';
import { useLocation } from 'react-router';

export const ScrollToTop = ({ children }) => {
  const { pathname, search } = useLocation ();
  useEffect (() => {
    window.scrollTo (0, 0);
  }, [pathname, search]);
  return children || null;
};
