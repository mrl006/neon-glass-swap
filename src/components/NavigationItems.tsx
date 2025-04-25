
import React from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Bridge', href: '/bridge' },
  { label: 'Swap', href: '/' },
  { label: 'Pools', href: '/pools' },
  { label: 'Stake', href: '/stake' },
  { label: 'Explorer', href: '/explorer' },
];

const NavigationItems = () => {
  return (
    <div className="hidden md:flex items-center gap-8">
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.href}
          className="text-gray-300 hover:text-white transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default NavigationItems;
