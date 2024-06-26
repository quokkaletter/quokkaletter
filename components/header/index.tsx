'use client';

import { TextAlignJustifyIcon } from '@radix-ui/react-icons';
import { Nav } from 'components/nav';
import { motion } from 'framer-motion';
import { useGetNicknameQuery } from 'hooks/useGetNicknameQuery';
import { usePathname } from 'next/navigation';
import Logo from 'public/images/logo.png';
import { useEffect, useRef, useState } from 'react';

export const Header: React.FC = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const pathname = usePathname();
  const userId = pathname.match(/\/dashboard\/([a-zA-Z0-9]+)/)[1];

  const {
    nickname: { data: nickname },
  } = useGetNicknameQuery({
    userId,
  });

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const navVariants = {
    opened: { x: 0 },
    closed: { x: '100%' },
  };

  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsNavVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isNavVisible]);

  return (
    <header className="bg-[#588251]/50 text-white flex justify-between p-3 relative">
      <a href="/" className="flex items-center gap-2">
        <img src={Logo.src} alt="logo" className="w-6" />
        {nickname ? `${nickname}'s quokka letter` : 'quokka letter'}
      </a>
      <TextAlignJustifyIcon
        onClick={toggleNav}
        className="w-[20px] h-[20px] cursor-pointer"
        ref={hamburgerRef}
      />
      <motion.nav
        initial="closed"
        animate={isNavVisible ? 'opened' : 'closed'}
        exit="closed"
        variants={navVariants}
        className="bg-[#588251]/50 w-[50%] absolute right-0 top-[48px] h-screen z-10"
        transition={{ duration: 0.3 }}
        ref={navRef}
      >
        <Nav />
      </motion.nav>
    </header>
  );
};
