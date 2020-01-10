import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const PollItem = ({ text, percent, selected, onClick }) => (
  <Area onClick={onClick}>
    <Bar percent={percent} selected={selected} />
    <LeftText>{text}</LeftText>
    <RightText>{percent}%</RightText>
  </Area>
);

PollItem.propTypes = {
  text: PropTypes.string,
  percent: PropTypes.number,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

PollItem.defaultProps = {
  text: '',
  percent: 0,
  selected: false,
  onClick: null,
};

const Area = styled.div`
  position: relative;
  font-family: 'Lato', sans-serif;
  height: 32px;

  &:nth-child(even) {
    border: 1px solid ${props => props.theme.colorRowBgEven || '#F0F8FF'};
    background-color: ${props => props.theme.colorRowBgEven || '#F0F8FF'};
  }
  &:nth-child(odd) {
    border: 1px solid ${props => props.theme.colorRowBgOdd || '#FFFFF0'};
    background-color: ${props => props.theme.colorRowBgOdd || '#FFFFF0'};
  }
  &:hover {
    border: 1px solid ${props => props.theme.colorRowHoverBorder || '#0000F8'};
  }
`;

const Bar = styled.div`
  position: absolute;
  height: 100%;
  cursor: pointer;
  width: ${props => `${props.percent}%`};
  transition: width 3s;
  background-color: ${props => props.theme.colorBarFill || '#B0C4DE'};
`;

const LeftText = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  white-space: nowrap;
}`;

const RightText = styled.div`
  position: absolute;
  top: 8px;
  right: 0;
  text-align: right;
  white-space: nowrap;
}`;
