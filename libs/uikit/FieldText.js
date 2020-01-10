import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from './Box';
import { Text } from './Text';
import { FieldLabel } from './FieldLabel';
import { FieldElementStyle } from './FieldElementStyle';
import { GridBoxElement } from './GridBoxElement';

const StyledText = styled (Text)`
  ${FieldElementStyle}
  background-color: transparent;
  border-color: #eeeeee;
`;

export const FieldText = ({ id, children, span, row, label, ...rest }) => (
  <GridBoxElement span={span} row={row}>
    <FieldLabel htmlFor={id}>{label}</FieldLabel>
    <Box ml='10px'>
      <StyledText id={id} minh='1em' {...rest}>{children === '' ? '\xa0' : children}</StyledText>
    </Box>
  </GridBoxElement>
);

FieldText.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  span: PropTypes.number,
  row: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

FieldText.defaultProps = {
  span: 12,
  row: false,
};
