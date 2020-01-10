
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

function usePortal () {
  const ref = useRef (null);

  useEffect (() => {
    document.body.append (ref.current);

    return (() => {
      document.body.removeChild (ref.current);
    });
  }, []);

  function getRootElement () {
    if (ref.current === null) {
      ref.current = document.createElement ('div');
    }
    return ref.current;
  }

  return getRootElement ();
}

export const Modal = ({ top, children }) => {
  const content = (
    <Background>
      <Panel top={top}>
        {children}
      </Panel>
    </Background>
  );

  return createPortal (content, usePortal ());
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
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

const Panel = styled.div`
  position: fixed;
  top: ${props => props.top};
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

Panel.propTypes = {
  top: PropTypes.oneOfType ([PropTypes.string, PropTypes.number]),
};

Panel.defaultProps = {
  top: '30%',
};
