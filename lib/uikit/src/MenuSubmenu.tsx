import { useState } from 'react';
import styled from 'styled-components';
import { MenuItem } from './MenuItem.js';
import { MenuFloating } from './MenuFloating.js';
import { MenuSpacer } from './MenuSpacer.js';

type PropsSubMenuImpl = {
  text: string,
  right: boolean,
  spacer: string,
  children: React.ReactNode,
  className: string,
};

const SubMenuImpl = ({
  text, right, spacer, children, className, ...rest
}: PropsSubMenuImpl) => {
  const [show, setShow] = useState (false);

  const onToggle = () => {
    setShow (!show);
  };

  const onHide = () => {
    setShow (false);
  };

  return (
    <div className={className} {...rest} onMouseLeave={onHide}>
      <span onClick={onToggle}>{text}<span style={{ fontSize: '70%' }}> {'\u25bc'}</span></span>
      { show && (
        <>
          <MenuSpacer right={right} h={spacer} />
          <MenuFloating right={right} top={spacer} onClick={onHide}>
            {children}
          </MenuFloating>
        </>
      )}
    </div>
  );
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

type Props = {
  text: string,
  right?: boolean,
  spacer?: string,
  children: React.ReactNode,
  className?: string,
};

export const MenuSubmenu = ({
  text,
  right = false,
  spacer = '2px',
  className = '',
  children,
}: Props) => (
  <StyledMenuItem as={SubMenuImpl} text={text} right={right} spacer={spacer} className={className}>
    {children}
  </StyledMenuItem>
);
