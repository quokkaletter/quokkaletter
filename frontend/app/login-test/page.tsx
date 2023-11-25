'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

// TODO : 해당 페이지는 실제 로그인 페이지 구현할 때 제거 예정
const LoginTest = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div data-testid="user-name">
        {session.user?.name}님 반갑습니다 <br />
        <button onClick={() => signOut()}>로그아웃</button>
      </div>
    );
  }
  return (
    <div>
      로그인되지 않았습니다 <br />
      <button onClick={() => signIn('kakao')}>로그인</button>
    </div>
  );
};

export default LoginTest;
