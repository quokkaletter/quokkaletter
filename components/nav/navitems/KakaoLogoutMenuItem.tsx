'use client';

import { Separator } from '@/components/ui/separator';

import React from 'react';
import { signOut } from 'next-auth/react';

export const KakaoLogoutMenuItem = () => {
  return (
    <>
      <Separator className="my-3 border border-solid rounded opacity-70" />
      <button onClick={() => signOut()}>로그아웃</button>
    </>
  );
};
