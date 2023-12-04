'use client';

import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export const KakaoLoginButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>{session.user?.name}님 반갑습니다</p>
        <button onClick={() => signOut()}>로그아웃</button>
      </>
    );
  }
  return (
    <>
      <p>로그인되지 않았습니다</p>
      <button onClick={() => signIn('kakao')}>로그인</button>
    </>
  );
};
