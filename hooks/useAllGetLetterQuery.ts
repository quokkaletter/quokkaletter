import { useQuery } from '@tanstack/react-query';
import { letterManagerKeys } from 'lib/query';

type GetLettersParams = {
  userId: string;
};

export type Letter = {
  writerId: string;
  recipientId: string;
  contents: string;
  anonymousNickname: string;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
  treeIconNumber: number;
  id: number;
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
  const letters = useQuery<Letter[]>({
    queryKey: [...letterManagerKeys.letters, userId],
    enabled: !!userId,
    queryFn: () => getLetters({ userId }),
    select: (data) => {
      return data?.map((letter, idx) => ({
        id: idx,
        ...letter,
      }));
    },
  });

  return {
    letters,
  };
};
