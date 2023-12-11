'use client';

import { TextAlignJustifyIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Nav } from 'components/nav';

export const Header: React.FC = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <header className="bg-[#588251]/50 text-white flex justify-between just p-3 relative">
      <p>quokka letter</p>
      <TextAlignJustifyIcon
        onClick={toggleNav}
        className="w-[20px] h-[20px] cursor-pointer"
      />

      <nav
        className={`bg-[#588251]/50 w-[80%] h-screen absolute right-0 top-[48px] ${
          isNavVisible ? 'visible' : 'invisible'
        }`}
      >
        <Nav />
      </nav>
    </header>
  );
};
