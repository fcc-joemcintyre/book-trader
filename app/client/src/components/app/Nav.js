import { Fragment, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MenuBar, MenuDropdown, MenuItem, MenuSeparator, MenuSubmenu, Text } from 'uikit';
import { Login } from '../login';
import { Register } from '../register';

const StyledMenuDropdown = styled (MenuDropdown)`
  display: inline-block;
  padding: 4px;
  margin-top: 8px;
  margin-right: 8px;
`;

export const Nav = ({ menu }) => {
  const [dialog, setDialog] = useState (null);
  const [innerWidth, setInnerWidth] = useState (window.innerWidth);
  const navigate = useNavigate ();
  const authenticated = useSelector ((a) => a.user.authenticated);

  const onResize = useCallback (() => {
    setInnerWidth (window.innerWidth);
  }, [setInnerWidth]);

  useEffect (() => {
    window.addEventListener ('resize', onResize);
    return (() => window.removeEventListener ('resize', onResize));
  }, [onResize]);

  const onClose = useCallback (() => {
    setDialog (null);
  }, [setDialog]);

  const menus = (innerWidth < 420) ? (
    <StyledMenuDropdown m='10px 8px 0 4px' spacer={8}>
      <MenuItem as={NavLink} to='/' exact>All</MenuItem>
      { authenticated && <MenuItem as={NavLink} to='/requests'>Requests</MenuItem> }
      { authenticated && <MenuItem as={NavLink} to='/manage'>Manage</MenuItem> }
      <MenuItem as={NavLink} to='/about'>About</MenuItem>
      <MenuSeparator spacing='4px' />
      { authenticated && <MenuItem as={NavLink} to='/logout'>Logout</MenuItem> }
      { !authenticated &&
        <MenuItem onClick={() => setDialog (<Register onClose={onClose} />)}>Register</MenuItem>
      }
      { !authenticated &&
        <MenuItem onClick={() => setDialog (<Login onClose={onClose} />)}>Login</MenuItem>
      }
    </StyledMenuDropdown>
  ) : authenticated ? (
    <MenuBar right>
      <MenuItem as={NavLink} to='/requests'>Requests</MenuItem>
      <MenuItem as={NavLink} to='/manage'>Manage</MenuItem>
      <MenuItem as={NavLink} to='/about'>About</MenuItem>
      <MenuSubmenu text='User' right spacer='8px'>
        <MenuItem as={NavLink} to='/logout'>Logout</MenuItem>
      </MenuSubmenu>
    </MenuBar>
  ) : (
    <MenuBar right>
      <MenuItem as={NavLink} to='/about'>About</MenuItem>
      <MenuItem onClick={() => setDialog (<Register onClose={onClose} />)}>Register</MenuItem>
      <MenuItem onClick={() => setDialog (<Login onClose={onClose} />)}>Login</MenuItem>
    </MenuBar>
  );

  return (
    <Fragment>
      <Container>
        <Content>
          {menu && innerWidth < 420 && menus}
          <Title onClick={() => navigate ('/')}>BookTrader</Title>
          {menu && innerWidth >= 420 && menus}
        </Content>
      </Container>
      { dialog }
    </Fragment>
  );
};

Nav.propTypes = {
  menu: PropTypes.bool.isRequired,
};

export const Container = styled.div`
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  ${({ theme }) => `
    color: ${theme.colors.navTextColor};
    background-color: ${theme.colors.navColor};
  `}
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 8px;
  height 50px;

  @media (max-width: 300px) {
    height: 40px;
  }
`;

export const Title = styled (Text)`
  font-size: 30px;
  display: inline-block;
  vertical-align: top;
  color: #00ffff;
  text-shadow: 2px 2px 2px #ff00ff;
  line-height: 1.0;
  cursor: pointer;
`;
