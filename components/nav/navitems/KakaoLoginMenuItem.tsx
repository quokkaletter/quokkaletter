'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';

export const KakaoLoginMenuItem = () => {
  const { data: session } = useSession();

  return (
    <>
      <p className="mb-2">{session?.user?.name}님 반갑습니다.</p>
      <button onClick={() => signOut()}>로그아웃</button>
    </>
  );
};
