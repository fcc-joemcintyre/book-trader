/* eslint-disable no-use-before-define */
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

function usePortal () {
  const ref = useRef<HTMLDivElement | null> (null);

  useEffect (() => {
    const node = ref.current;
    if (node) {
      document.body.append (node);
      return (() => {
        document.body.removeChild (node);
      });
    }
    return undefined;
  }, []);

  function getRootElement () {
    if (ref.current === null) {
      ref.current = document.createElement ('div');
    }
    return ref.current;
  }

  return getRootElement ();
}

type Props = {
  top?: string | number,
  children: React.ReactNode,
};

export const Modal = ({
  top = '30%',
  children,
}: Props) => {
  const content = (
    <Background>
      <Panel top={top}>
        {children}
      </Panel>
    </Background>
  );

  return createPortal (content, usePortal ());
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.3);
  z-index: 90;
`;

type PanelProps = {
  top: string | number,
};

const Panel = styled.div<PanelProps>`
  position: fixed;
  top: ${({ top }) => top || '30%'};
  left: 50%;
  min-width: 33%;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 100px);
  max-width: calc(100% - 100px);
  background-color: white;
  border: 2px solid #222222;
  border-radius: 8px;
  overflow: auto;
  z-index: 91;
`;
