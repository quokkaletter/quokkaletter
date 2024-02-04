'use client';

import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { Separator } from 'components/ui/separator';
import { useSession } from 'next-auth/react';
import React from 'react';
import { toast } from 'sonner';

export const LinkClipBoardMenuItem = () => {
  const { data: session } = useSession();

  const handleCopyMyLink = async () => {
    const myLink = `${process.env.NEXT_PUBLIC_QUOKKA_LETTER_URL}/dashboard/${session.user.id}`;

    if (
      'maxTouchPoints' in navigator &&
      navigator.maxTouchPoints > 0 &&
      navigator.share
    ) {
      try {
        navigator.share({
          text: myLink,
        });

        toast.success('링크가 성공적으로 공유되었습니다.');
      } catch (error) {
        toast.error('다시 한번 시도해보세요!');
      }
    } else {
      await navigator.clipboard.writeText(myLink);

      toast.success('링크가 클립보드에 복사되었어요.');
    }
  };

  return (
    <>
      <Separator className="my-3 border border-solid rounded opacity-70" />
      <p
        className="flex items-center gap-1 cursor-pointer"
        onClick={handleCopyMyLink}
      >
        내 링크 공유하기
        <ArrowTopRightIcon />
      </p>
    </>
  );
};
