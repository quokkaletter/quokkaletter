import { KakaoLogoutMenuItem } from 'components/nav/navitems/KakaoLogoutMenuItem';
import { LinkClipBoardMenuItem } from 'components/nav/navitems/LinkClipBoardMenuItem';
import { useGetNicknameQuery } from 'hooks/useGetNicknameQuery';
import { useSession } from 'next-auth/react';

export const Nav = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { nickname } = useGetNicknameQuery({ userId });

  console.log('nickname', nickname);

  return (
    <div className="p-4">
      <p>{nickname.data}님 반갑습니다.</p>
      <LinkClipBoardMenuItem />
      <KakaoLogoutMenuItem />
    </div>
  );
};
