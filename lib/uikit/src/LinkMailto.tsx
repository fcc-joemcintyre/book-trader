import styled from 'styled-components';

type TAnchor = {
  to: string,
  subject?: string,
  children: React.ReactNode,
};

const Anchor = ({ to, subject, children, ...rest }: TAnchor) => (
  <a
    href={`mailto:${to}${subject ? `?subject=${subject}` : ''}`}
    {...rest}
  >
    {children}
  </a>
);

export type TLinkMailto = {
  c: string,
  tc: string,
};

export const LinkMailto = styled (Anchor)<TLinkMailto>`
  ${({ c, tc, theme }) => `
    text-decoration: none;
    color: ${(tc && theme.colors[tc]) ? theme.colors[tc] : c};
    &:visited: {
      color: ${(tc && theme.colors[tc]) ? theme.colors[tc] : c}
    }
  `}
`;
