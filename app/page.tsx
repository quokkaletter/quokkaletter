import { WriteLetterButton } from '@components/WriteLetterButton';
import { Header } from '@components/header';

export default function Home() {
  return (
    <div className="overflow-hidden h-full">
      <Header />
      <div className="">
        <WriteLetterButton />
      </div>
    </div>
  );
}
