type Props = {
  type?: 'button' | 'submit' | 'reset',
  disabled?: boolean,
  onClick?: () => void,
  children: React.ReactNode,
};

/* eslint-disable react/button-has-type */
export const Button = ({ type = 'button', disabled, children, ...rest }: Props) => {
  const t = disabled ?
    'bg-blue-300 cursor-not-allowed' :
    'bg-blue-600 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg';
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 ${t}`}
      {...rest}
    >
      {children}
    </button>
  );
};
