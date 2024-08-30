import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Container from '../Container';
import Dropdown from '../Dropdown';
import { currencies, langauges, LinkType, topBarLinks } from './data';
import DropdownMenu from '../DropdownMenu';
import Modal from '../Modal';
import AuthComponent from '@/features/auth';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '@/store/slices/auth/authSlice';

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch()
  const filteredLinks: LinkType[] = topBarLinks.filter(
    (link) => link.url !== pathname
  );
  const handleToggleLoginModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  useEffect(() => {
    const userData = localStorage.getItem('user') || '{}'

    dispatch(
      userLoggedIn({
        user: JSON.parse(userData),
      })
    );

  }, [[]])

  return (
    <div className="relative bg-white text-black-500 text-xs z-[91]">
      <Container>
        <div className="mx-auto flex justify-between items-center border-b border-[#f4f4f4] py-1">
          <div className="flex items-center space-x-6">
            <Dropdown
              id="currency"
              items={currencies}
              selected={currencies[0]}
              style="px-0"
            />
            <Dropdown
              id="currency"
              items={langauges}
              selected={langauges[0]}
              style="px-0"
            />
          </div>

          <div className="hidden sm:flex items-center space-x-6">
            {filteredLinks.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className="flex items-center text-[13px] tracking-[-0.13px] font-extralight uppercase hover:text-primary"
                onClick={handleToggleLoginModal}
              >
                {item?.icon && (
                  <i className={cn(item.icon, 'text-[15px] mr-2')}></i>
                )}{' '}
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center sm:hidden">
            <DropdownMenu
              items={topBarLinks}
              label="Links"
              position="bottom-right"
            />
          </div>
        </div>
      </Container>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className='!max-w-[575px]'>
        <AuthComponent setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
};

export default TopBar;
