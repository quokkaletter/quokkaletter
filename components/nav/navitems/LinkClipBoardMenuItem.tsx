'use client';

import React from 'react';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

//TODO : userId 데이터 연동 이후 제거 예정
const USER_ID = 'my-id';

export const LinkClipBoardMenuItem = () => {
  const handleCopyMyLink = () => {
    const myLink = `/dashboard/${USER_ID}`;

    navigator.clipboard.writeText(myLink);

    toast.success('링크가 복사되었어요!');
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
