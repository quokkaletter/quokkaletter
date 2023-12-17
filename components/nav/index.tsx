'use client';

import { KakaoLogoutMenuItem } from 'components/nav/navitems/KakaoLogoutMenuItem';
import { LinkClipBoardMenuItem } from 'components/nav/navitems/LinkClipBoardMenuItem';
import { useSession } from 'next-auth/react';

export const Nav = () => {
  const { data: session } = useSession();

  return (
    <div className="p-4">
      <p>{session?.user?.name}님 반갑습니다.</p>
      <LinkClipBoardMenuItem />
      <KakaoLogoutMenuItem />
    </div>
  );
};
