'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export const LoginOrJoinButton = () => {
  return (
    <>
      <Button
        className="bg-[#D9D9D9] text-primary py-2 px-4"
        onClick={() => signIn('kakao')}
      >
        카카오 로그인 / 회원가입 하러가기
      </Button>
    </>
  );
};
