import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MenuItem } from './MenuItem';
import { MenuFloating } from './MenuFloating';
import { MenuSpacer } from './MenuSpacer';

const SubMenuImpl = ({ text, right, spacer, children, className, ...rest }) => {
  const [show, setShow] = useState (false);

  function onToggle () {
    setShow (!show);
  }

  function onHide () {
    setShow (false);
  }

  return (
    <div className={className} {...rest} onMouseLeave={onHide}>
      <span onClick={onToggle}>{text}<span style={{ fontSize: '70%' }}> {'\u25bc'}</span></span>
      { show &&
        <Fragment>
          <MenuSpacer right={right} h={spacer} />
          <MenuFloating right={right} top={spacer} onClick={onHide}>
            {children}
          </MenuFloating>
        </Fragment>
      }
    </div>
  );
};

SubMenuImpl.propTypes = {
  text: PropTypes.node.isRequired,
  right: PropTypes.bool.isRequired,
  spacer: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};

const StyledMenuItem = styled (MenuItem)`
  > ${MenuFloating} {
    ${({ theme }) => `
      ${theme.navSubBorder ? `border: ${theme.navSubBorder};` : ''}
      ${theme.navSubBorderTop ? `border-top: ${theme.navSubBorderTop};` : ''}
      ${theme.navSubBorderBottom ? `border-bottom: ${theme.navSubBorderBottom};` : ''}
      ${theme.navSubBorderLeft ? `border-left: ${theme.navSubBorderLeft};` : ''}
      ${theme.navSubBorderRigt ? `border-right: ${theme.navSubBorderRight};` : ''}
      ${theme.navSubShadow ? `box-shadow: ${theme.navSubShadow};` : ''}
    `}

    > ${MenuItem} {
      ${({ theme }) => `
        ${theme.colors.navSubBg ? `background-color: ${theme.colors.navSubBg};` : theme.colors.navColor}
      `}
    }
  }
`;

export const MenuSubmenu = ({ text, right, spacer, className, children }) => (
  <StyledMenuItem as={SubMenuImpl} text={text} right={right} spacer={spacer} className={className}>
    {children}
  </StyledMenuItem>
);

MenuSubmenu.propTypes = {
  text: PropTypes.string.isRequired,
  right: PropTypes.bool,
  spacer: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

MenuSubmenu.defaultProps = {
  right: false,
  spacer: '2px',
  className: '',
};
