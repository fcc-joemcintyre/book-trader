type Props = {
  htmlFor: string,
  required?: boolean,
  children: React.ReactNode,
};

export const FieldLabel = ({ htmlFor, required, children, ...rest }: Props) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm ${required ? 'after:{content:" *"}' : ''}`}
    {...rest}
  >
    {children}
  </label>
);
