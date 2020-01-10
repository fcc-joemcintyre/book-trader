
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from './Box';
import { Button } from './Button';
import { Flex } from './Flex';
import { Modal } from './Modal';

export const MessageBox = ({ actions, closeAction, content, data, onClose }) => {
  function onKeydown (e) {
    if (closeAction && (e.keyCode === 27)) {
      onClose (closeAction, data);
    }
  }

  useEffect (() => {
    document.addEventListener ('keydown', onKeydown);

    return (() => {
      document.removeEventListener ('keydown', onKeydown);
    });
  }, []);

  return (
    <Modal>
      { closeAction &&
        <Box p='16px 8px 0 0'>
          <Close onClick={() => { onClose (closeAction, data); }} />
        </Box>
      }
      <Box p='16px 16px 16px 16px' align='center'>
        {content}
      </Box>
      { (actions.length > 0) &&
        <Flex center pb='16px' gap='6px'>
          { actions.map (action => (
            <Button
              type='button'
              key={action}
              onClick={() => { onClose (action, data); }}
            >
              {action}
            </Button>
          ))}
        </Flex>
      }
    </Modal>
  );
};

MessageBox.propTypes = {
  data: PropTypes.oneOfType ([PropTypes.string, PropTypes.shape ({})]),
  actions: PropTypes.arrayOf (PropTypes.string),
  closeAction: PropTypes.string,
  content: PropTypes.node.isRequired,
  onClose: PropTypes.func,
};

MessageBox.defaultProps = {
  data: null,
  actions: [],
  closeAction: null,
  onClose () { /* no op */ },
};

const Close = styled.div`
  flex: 0 0;
  margin-left: auto;
  width: 18px;
  height: 18px;
  background:
    linear-gradient(-45deg, transparent 0%, transparent 46%, darkgray 46%, darkgray 56%, transparent 56%, transparent 100%),
    linear-gradient(45deg, transparent 0%, transparent 46%, darkgray 46%, darkgray 56%, transparent 56%, transparent 100%);
  cursor: pointer;
  color: darkgray;
`;
