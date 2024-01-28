'use client';

import { Button } from 'components/ui/button';
import { signIn } from 'next-auth/react';

export const LoginOrJoinButton = () => {
  return (
    <>
      <Button variant="button" onClick={() => signIn('kakao')}>
        카카오 로그인 / 회원가입 하러가기
      </Button>
    </>
  );
};
