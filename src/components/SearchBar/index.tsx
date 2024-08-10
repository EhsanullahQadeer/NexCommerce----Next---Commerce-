import { FC } from 'react';
import { cn } from '@/lib/utils';
import Input from '../Input';
import NotificationIcon from '../Navbar/elements/NotificationIcon';
import Button from '../Button';

interface SearchBarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const searchbarBaseStyles =
  'hidden absolute opacity-0 lg:flex w-full h-full bg-white top-[-65px] justify-center align-center left-0 right-0 mx-auto';
const searchbarActiveStyles = 'top-0 opacity-100';

const SearchBar: FC<SearchBarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={cn(searchbarBaseStyles, isOpen && searchbarActiveStyles)}
      style={{ transition: 'all 100ms ease-in' }}
    >
      <div className="flex w-full items-center justify-center gap-3">
        <Input placeholder="Search..." className="max-w-[400px]" />
        <NotificationIcon
          icon={'las la-search'}
          iconClass="text-black-75"
        />
        <Button className="max-h-[40px]" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
