/* eslint-disable no-use-before-define */
import { useEffect } from 'react';
import styled from 'styled-components';
import { Box } from './Box';
import { Button } from './Button';
import { Flex } from './Flex';
import { Modal } from './Modal';

type Props = {
  actions?: string[],
  closeAction?: string,
  content: React.ReactNode,
  data?: unknown,
  onClose: (closeAction: string, data: unknown) => void,
};

export const MessageBox = ({
  actions = [],
  closeAction,
  content,
  data,
  onClose = () => { /* no op */ },
}: Props) => {
  useEffect (() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (closeAction && (e.code === 'Escape')) {
        onClose (closeAction, data);
      }
    };

    document.addEventListener ('keydown', onKeydown);

    return (() => {
      document.removeEventListener ('keydown', onKeydown);
    });
  }, [closeAction, data, onClose]);

  return (
    <Modal>
      { closeAction && (
        <Box p='16px 8px 0 0'>
          <Close onClick={() => { onClose (closeAction, data); }} />
        </Box>
      )}
      <Box p='16px 16px 16px 16px' align='center'>
        {content}
      </Box>
      <Box>Test</Box>
      { (actions.length > 0) && (
        <Flex center pb='16px' gap='6px'>
          {actions.map ((action) => (
            <Button
              type='button'
              key={action}
              onClick={() => { onClose (action, data); }}
            >
              {action}
            </Button>
          ))}
        </Flex>
      )}
    </Modal>
  );
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
