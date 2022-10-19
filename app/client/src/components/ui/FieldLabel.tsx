type Props = {
  htmlFor: string,
  required?: boolean,
  children: React.ReactNode,
};

export const FieldLabel = ({ htmlFor, required, children, ...rest }: Props) => (
  <label
    htmlFor={htmlFor}
    className={`${required ? 'after:{content:" *"}' : ''}`}
    {...rest}
  >
    {children}
  </label>
);
