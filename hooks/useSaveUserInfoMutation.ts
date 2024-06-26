import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userManagerKeys } from 'lib/query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const saveUserInfo = async ({ nickname, userId }: UserInfo) => {
  const res = await fetch('/api/nickname', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickname, userId }),
  });

  if (!res.ok) {
    throw new Error('닉네임을 저장하는데 실패했어요.');
  }

  return await res.json();
};

type UserInfo = {
  nickname: string;
  userId: string;
};

export const useSaveUserInfoMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation(
    ({ nickname, userId }: UserInfo) => saveUserInfo({ nickname, userId }),
    {
      onSuccess: () => {
        toast.success('닉네임을 저장했어요!');
        router.push('/');

        return queryClient.invalidateQueries(userManagerKeys.user);
      },
    },
  );

  return mutate;
};
