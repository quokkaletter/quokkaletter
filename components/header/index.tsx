'use client';

import { TextAlignJustifyIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Nav } from 'components/nav';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export const Header: React.FC = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user && !isNavVisible) {
      setIsNavVisible(true);
    }
  }, [session]);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <header className="bg-[#588251]/50 flex justify-between just p-3 relative">
      <p>quokka letter</p>
      <TextAlignJustifyIcon
        onClick={toggleNav}
        className="w-[20px] h-[20px] cursor-pointer"
      />

      <nav
        className={`bg-blue-500 w-[80%] h-screen absolute right-0 top-[48px] ${
          isNavVisible ? 'visible' : 'invisible'
        }`}
      >
        <Nav />
      </nav>
    </header>
  );
};
