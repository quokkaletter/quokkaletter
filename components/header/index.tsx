'use client';

import { TextAlignJustifyIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Nav } from 'components/nav';

export const Header: React.FC = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const navVariants = {
    opened: { x: 0 },
    closed: { x: '100%' },
  };

  return (
    <header className="bg-[#588251]/50 text-white flex justify-between p-3 relative">
      <p>quokka letter</p>
      <TextAlignJustifyIcon
        onClick={toggleNav}
        className="w-[20px] h-[20px] cursor-pointer"
      />

      <motion.nav
        initial="closed"
        animate={isNavVisible ? 'opened' : 'closed'}
        exit="closed"
        variants={navVariants}
        className="bg-[#588251]/50 w-[80%] absolute right-0 top-[48px] h-screen"
      >
        <Nav />
      </motion.nav>
    </header>
  );
};
