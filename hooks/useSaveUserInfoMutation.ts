import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userManagerKeys } from 'lib/query';
import { toast } from 'sonner';

const saveUserInfo = async ({ nickname }: UserInfo) => {
  const res = await fetch('/api/nickname', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // TODO: token
      // authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ nickname }),
  });

  if (!res.ok) {
    throw new Error('닉네임을 저장하는데 실패했어요.');
  }

  return await res.json();
};

type UserInfo = {
  nickname: string;
};

export const useSaveUserInfoMutation = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    ({ nickname }: UserInfo) => saveUserInfo({ nickname }),
    {
      onSuccess: () => {
        toast.success('닉네임을 저장했어요!');
        return queryClient.invalidateQueries(userManagerKeys.user);
      },
    },
  );

  return mutate;
};
