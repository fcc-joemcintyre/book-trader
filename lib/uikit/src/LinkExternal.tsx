import styled from 'styled-components';

type TAnchor = {
  to: string,
  children: React.ReactNode,
};

const Anchor = ({ to, children, ...rest }: TAnchor) => (
  <a
    href={to}
    target='_blank'
    rel='noopener noreferrer'
    {...rest}
  >
    {children}
  </a>
);

export type TLinkExternal = {
  c: string,
  tc: string,
};

export const LinkExternal = styled (Anchor)<TLinkExternal>`
  ${({ c, tc, theme }) => `
    text-decoration: none;
    color: ${(tc && theme.colors[tc]) ? theme.colors[tc] : c};
    &:visited: {
      color: ${(tc && theme.colors[tc]) ? theme.colors[tc] : c}
    }
  `}
`;
