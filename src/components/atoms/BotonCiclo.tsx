import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface BotonCicloProps extends Omit<LinkProps, 'className'> {
  children: React.ReactNode;
}

const BotonCiclo: React.FC<BotonCicloProps> = ({ to, children, ...props }) => {
  return (
    <Link
      to={to}
      className="block w-full text-center bg-[#D81B60] hover:bg-[#C2185B] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
      {...props}
    >
      {children}
    </Link>
  );
};

export default BotonCiclo;
