type Props = {
  size?: number,
  color?: string,
};

export const MenuDropdownIcon = ({ size, color }: Props) => (
  <svg fill={color || '#000000'} height={size || 20} width={size || 20} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <rect x='0' y='0' width='24' height='24' fill='none' />
    <line x1='2' y1='6' x2='22' y2='6' strokeWidth='3' strokeLinecap='round' stroke={color} />
    <line x1='2' y1='12' x2='22' y2='12' strokeWidth='3' strokeLinecap='round' stroke={color} />
    <line x1='2' y1='18' x2='22' y2='18' strokeWidth='3' strokeLinecap='round' stroke={color} />
  </svg>
);
