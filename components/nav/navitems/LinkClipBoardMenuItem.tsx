'use client';

import React from 'react';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

export const LinkClipBoardMenuItem = () => {
  const { data: session } = useSession();

  const handleCopyMyLink = async () => {
    const myLink = `${process.env.NEXT_PUBLIC_QUOKKA_LETTER_URL}/dashboard/${session.user.id}`;

    if (
      'maxTouchPoints' in navigator &&
      navigator.maxTouchPoints > 0 &&
      navigator.share
    ) {
      navigator
        .share({
          text: myLink,
        })
        .then(() => toast.success('링크가 성공적으로 공유되었습니다.'));
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
