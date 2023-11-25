// eslint-disable-next-line
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      exp: number;
      iat: number;
      jti: string;
      name: string;
      picture: string;
      sub: string;
    };
  }
}
