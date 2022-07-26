import { createContext, useState } from 'react';
import styled from 'styled-components';
import { Box } from './Box.js';

type ContextProps = {
  activeValue: string | number,
  onSelect: (value: string | number) => void,
};

const { Provider, Consumer } = createContext<ContextProps> ({
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
    border-bottom: 1px solid ${({ theme }) => theme.colors.tabLineColor};
    z-index: 1;
  }
`;

type TabLabelProps = {
  selected: boolean,
};

const TabLabel = styled.div<TabLabelProps>`
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

type TabProps = {
  value: string | number,
  children: React.ReactNode,
};

export const Tab = ({ value, children, ...rest }: TabProps) => (
  <Consumer>
    {({ activeValue, onSelect }) => (
      <TabLabel
        {...rest}
        selected={value === activeValue}
        onClick={() => onSelect (value)}
      >
        {children}
      </TabLabel>
    )}
  </Consumer>
);

type TabPanelProps = {
  value: string | number,
  children: React.ReactNode,
};

export const TabPanel = ({ value, children }: TabPanelProps) => (
  <Consumer>
    {({ activeValue }) => (activeValue === value ? children : null)}
  </Consumer>
);

type Props = {
  initialValue: string | number,
  children: React.ReactNode,
};

export const TabController = ({ initialValue, children }: Props) => {
  const [activeValue, setActiveValue] = useState (initialValue);

  const onSelect = (value: string | number) => {
    setActiveValue (value);
  };

  return (
    <Provider value={{ activeValue, onSelect }}>
      {children}
    </Provider>
  );
};
