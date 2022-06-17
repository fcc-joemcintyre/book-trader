import { useState } from 'react';
import styled from 'styled-components';
import { Box } from './Box.js';
import { MenuDropdownIcon } from './MenuDropdownIcon.js';
import { MenuFloating } from './MenuFloating.js';
import { MenuSpacer } from './MenuSpacer.js';

type Props = {
  right?: boolean,
  children: React.ReactNode,
  className?: string,
};

const DropMenuImpl = ({ right, children, className, ...rest }: Props) => {
  const [show, setShow] = useState (false);

  const onToggle = () => {
    setShow (!show);
  };

  const onHide = () => {
    setShow (false);
  };

  return (
    <div className={className || ''} {...rest} onMouseLeave={onHide}>
      <Box m='4px 4px 4px 4px' onClick={onToggle}>
        <MenuDropdownIcon />
      </Box>
      { show && (
        <>
          <MenuSpacer right={right} />
          <MenuFloating top='0px'>
            {children}
          </MenuFloating>
        </>
      )}
    </div>
  );
};

export const MenuDropdown = styled (DropMenuImpl)`
  position: relative;
  display: inline-block;
  ${({ theme }) => `
    color: ${theme.colors.navText};
    background-color: ${theme.colors.navColor};
  `}
`;
