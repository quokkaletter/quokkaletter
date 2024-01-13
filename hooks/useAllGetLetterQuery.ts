import { useQuery } from '@tanstack/react-query';
import { letterManagerKeys } from 'lib/query';
import { useSession } from 'next-auth/react';

type GetLettersParams = {
  userId: string;
};

type Letter = {
  anonymousNickname: string;
  contents: string;
  isVisible: boolean;
  recipientId: string;
  writerId: string;
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

export const useAllGetLetterQuery = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const letters = useQuery<Letter[]>({
    queryKey: [...letterManagerKeys.letters],
    enabled: !!userId,
    queryFn: () => getLetters({ userId }),
  });

  return {
    letters,
  };
};
