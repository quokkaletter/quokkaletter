'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

type AuthSessionProps = {
  children: ReactNode;
};

export const AuthSession = ({ children }: AuthSessionProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
