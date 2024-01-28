'use client';

import { useSaveUserInfoMutation } from 'hooks/useSaveUserInfoMutation';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const Join: React.FC = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [nickname, setNickname] = useState('');
  const saveUserInfo = useSaveUserInfoMutation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    saveUserInfo({ nickname, userId });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <label
            htmlFor="nickname"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            어떤 이름으로 불러드릴까요?
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="닉네임을 입력하세요"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          설정하기
        </button>
      </form>
    </div>
  );
};

export default Join;
