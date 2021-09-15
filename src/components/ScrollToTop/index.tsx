import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

export interface IScollToTopProps {}

export default function ScollToTop(props: IScollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
