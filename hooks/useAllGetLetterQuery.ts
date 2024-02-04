import { useQuery } from '@tanstack/react-query';
import { letterManagerKeys } from 'lib/query';
import { useSession } from 'next-auth/react';

type GetLettersParams = {
  userId: string;
};

type Letter = {
  writerId: string;
  recipientId: string;
  contents: string;
  anonymousNickname: string;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
  treeIconNumber: number;
};

const getLetters = async ({ userId }: GetLettersParams) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_QUOKKA_LETTER_URL}/api/letter/${userId}/recieved`,
  );

  if (!res.ok) {
    throw new Error('편지를 가져오지 못했어요!');
  }

  const { letters } = await res.json();

  return letters;
};

type useAllGetLetterQueryProps = {
  userId?: string;
};

export const useAllGetLetterQuery = ({ userId }: useAllGetLetterQueryProps) => {
  const { data: session } = useSession();
  const myId = session?.user?.id;

  const letters = useQuery<Letter[]>({
    queryKey: [...letterManagerKeys.letters],
    enabled: !!(userId ?? myId),
    queryFn: () => getLetters({ userId: userId ?? myId }),
  });

  console.log('letters', letters.data);

  return {
    letters,
  };
};
