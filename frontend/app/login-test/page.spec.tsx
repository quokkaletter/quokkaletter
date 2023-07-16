import { useSession } from 'next-auth/react';
import Test from './page';

import { render, screen } from '@testing-library/react';

describe('Test', () => {
  render(<Test />);

  describe('로그인을 함', () => {
    it('유저의 이름이 노출된다.', () => {
      expect(screen.getByTestId('user-name')).toBeInTheDocument();
    });
  });

  describe('로그인을 하지 않음', () => {
    beforeEach(() => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
      });
    });

    it('유저의 이름이 노출되지 않는다.', () => {
      expect(screen.queryByTestId('user-name')).not.toBeInTheDocument();
    });
  });
});
