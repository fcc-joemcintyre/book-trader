type Props = {
  children: React.ReactNode,
};

export const PageContent = ({ children }: Props) => (
  <div className='container max-w-screen-lg mx-auto p-4 pt-8 sm:p-2 sm:pt-4'>{children}</div>
);
