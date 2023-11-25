'use client';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type AuthSessionProps = {
  children: ReactNode;
};

export const AuthSession = ({ children }: AuthSessionProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
