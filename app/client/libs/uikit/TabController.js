import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from './Box';

const { Provider, Consumer } = createContext ({
  activeValue: 0,
  onSelect: () => { /* no op */ },
});

export const TabContainer = styled (Box)`
  position: relative;

  &::after {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.colors.tabLineColor};
    z-index: 1;
  }
`;

const TabLabel = styled.div`
  display: inline-block;
  padding: 10px 12px;
  margin-left: 4px;
  cursor: pointer;
  border-top: 1px solid #d3d3d3;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  border-radius: 8px 8px 0 0;
  ${({ theme, selected }) => (selected ? `
    color: ${theme.colors.tabTextSelectedColor};
    background-color: ${theme.colors.tabSelectedColor};
    border-bottom: 1px solid ${theme.colors.tabSelectedColor};
  ` : `
    color: ${theme.colors.tabTextColor};
    background-color: ${theme.colors.tabColor};
    border-bottom: 1px solid ${theme.colors.tabLineColor};
  `)};
`;

export const Tab = ({ value, children }) => (
  <Consumer>
    {({ activeValue, onSelect }) => (
      <TabLabel
        selected={value === activeValue}
        onClick={() => onSelect (value)}
      >
        {children}
      </TabLabel>
    )}
  </Consumer>
);

Tab.propTypes = {
  value: PropTypes.oneOfType ([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.node.isRequired,
};

export const TabPanel = ({ value, children }) => (
  <Consumer>
    {({ activeValue }) => (activeValue === value ? children : null)}
  </Consumer>
);

TabPanel.propTypes = {
  value: PropTypes.oneOfType ([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.node.isRequired,
};

export const TabController = ({ initialValue, children }) => {
  const [activeValue, setActiveValue] = useState (initialValue);

  function onSelect (value) {
    setActiveValue (value);
  }

  return (
    <Provider value={{ activeValue, onSelect }}>
      {children}
    </Provider>
  );
};

TabController.propTypes = {
  initialValue: PropTypes.oneOfType ([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.node.isRequired,
};
