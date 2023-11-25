import { TextAlignJustifyIcon } from '@radix-ui/react-icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#588251]/50 flex justify-between just p-3">
      <p>quokka letter</p>
      <TextAlignJustifyIcon className="w-[20px] h-[20px]" />
    </header>
  );
};
