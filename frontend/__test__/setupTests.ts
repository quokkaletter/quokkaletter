// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { server } from '__test__/mock-server/server';
global.alert = jest.fn();

beforeAll(() => {
  server?.listen();
});

afterEach(() => {
  server?.resetHandlers();
});

afterAll(() => {
  server?.close();
});

jest.mock('next-auth/react', () => {
  const mockSession = {
    user: {
      id: 'user-id',
      name: 'user-name',
      email: 'test@example',
    },
  };
  return {
    ...jest.requireActual('next-auth/react'),
    __esModule: true,
    useSession: jest.fn(() => {
      return {
        data: mockSession,
        status: 'authenticated',
      };
    }),
    getSession: jest.fn(() => mockSession),
  };
});
