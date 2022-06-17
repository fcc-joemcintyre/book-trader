import { createContext, useEffect, useState } from 'react';

export type TMediaProvider = {
  breakpoints: number[],
  children: React.ReactNode,
};

const { Provider, Consumer: MediaConsumer } = createContext (0);

export { MediaConsumer };

export const MediaProvider = ({ breakpoints, children }: TMediaProvider) => {
  const [breakpoint, setBreakpoint] = useState (0);

  useEffect (() => {
    if (breakpoints.length > 0) {
      window.addEventListener ('resize', onResize);
      onResize ();
    }

    return (() => {
      window.removeEventListener ('resize', onResize);
    });
  });

  function onResize () {
    const w = window.innerWidth;
    let b = 0;
    if (w >= breakpoints[breakpoints.length - 1]) {
      b = breakpoints.length;
    } else {
      while (w >= breakpoints[b]) {
        b += 1;
      }
    }
    if (breakpoint !== b) {
      setBreakpoint (b);
    }
  }

  return (
    <Provider value={breakpoint}>
      {children}
    </Provider>
  );
};
