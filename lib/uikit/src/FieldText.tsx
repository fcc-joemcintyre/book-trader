import styled from 'styled-components';
import { Box } from './Box';
import { Text } from './Text';
import { FieldLabel } from './FieldLabel';
import { FieldElementStyle } from './FieldElementStyle';
import { GridBoxElement } from './GridBoxElement';

type Props = {
  id: string,
  children: React.ReactNode,
  span?: number,
  row?: boolean,
  label: string,
};

const StyledText = styled (Text)`
  ${FieldElementStyle}
  background-color: transparent;
  border-color: #eeeeee;
`;

export const FieldText = ({
  id,
  children,
  span = 12,
  row = false,
  label,
  ...rest
}: Props) => (
  <GridBoxElement span={span} row={row}>
    <FieldLabel htmlFor={id}>{label}</FieldLabel>
    <Box ml='10px'>
      <StyledText id={id} minh='1em' {...rest}>{children === '' ? '\xa0' : children}</StyledText>
    </Box>
  </GridBoxElement>
);
