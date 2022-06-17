import styled from 'styled-components';

type TAnchor = {
  to: string,
  children: React.ReactNode,
};

const Anchor = ({ to, children, ...rest }: TAnchor) => (
  <a
    href={to}
    {...rest}
  >
    {children}
  </a>
);

export type TLinkInternal = {
  c: string,
  tc: string,
};

export const LinkInternal = styled (Anchor)<TLinkInternal>`
  ${({ c, tc, theme }) => `
    text-decoration: none;
    color: ${(tc && theme.colors[tc]) ? theme.colors[tc] : c};
    &:visited: {
      color: ${(tc && theme.colors[tc]) ? theme.colors[tc] : c}
    }
  `}
`;
