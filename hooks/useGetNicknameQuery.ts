import { useQuery } from '@tanstack/react-query';
import { nicknameManagerKeys } from 'lib/query';

type GetNicknameParams = {
  userId: string;
};

export const getNickname = async ({ userId }: GetNicknameParams) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_QUOKKA_LETTER_URL}/api/nickname/${userId}`,
    {
      method: 'GET',
    },
  );

  if (!res.ok) {
    throw new Error('닉네임을 가져오지 못했어요!');
  }

  const { nickname } = await res.json();

  return nickname;
};

export const useGetNicknameQuery = ({ userId }: GetNicknameParams) => {
  const nickname = useQuery({
    queryKey: [...nicknameManagerKeys.nickname],
    enabled: !!userId,
    queryFn: () => getNickname({ userId }),
  });

  return {
    nickname,
  };
};
