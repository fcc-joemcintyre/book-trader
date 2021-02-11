import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from './Box';
import { MenuDropdownIcon } from './MenuDropdownIcon';
import { MenuFloating } from './MenuFloating';
import { MenuSpacer } from './MenuSpacer';

const DropMenuImpl = ({ right, children, className, ...rest }) => {
  const [show, setShow] = useState (false);

  function onToggle () {
    setShow (!show);
  }

  function onHide () {
    setShow (false);
  }

  return (
    <div className={className} {...rest} onMouseLeave={onHide}>
      <Box m='4px 4px 4px 4px' onClick={onToggle}>
        <MenuDropdownIcon />
      </Box>
      { show &&
        <Fragment>
          <MenuSpacer right={right} />
          <MenuFloating top='0px'>
            {children}
          </MenuFloating>
        </Fragment>
      }
    </div>
  );
};

DropMenuImpl.propTypes = {
  right: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

DropMenuImpl.defaultProps = {
  right: false,
  children: null,
  className: '',
};

export const MenuDropdown = styled (DropMenuImpl)`
  position: relative;
  display: inline-block;
  ${({ theme }) => `
    color: ${theme.colors.navText};
    background-color: ${theme.colors.navColor};
  `}
`;
