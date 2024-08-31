import { useEffect, useState } from 'react';
import Link from 'next/link';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Container from '../Container';
import Dropdown from '../Dropdown';
import { currencies, langauges, LinkType, topBarLinks } from './data';
import DropdownMenu from '../DropdownMenu';
import Modal from '../Modal';
import AuthComponent from '@/features/auth';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedIn } from '@/store/slices/auth/authSlice';
import { RootState } from '@/store';

const TopBar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter()

  const filteredLinks: LinkType[] = topBarLinks.filter(
    (link) => link.url !== pathname
  );

  const handleToggleLoginModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    dispatch(userLoggedIn({ user: undefined }));
    setDropdownOpen(false)
    return router.push("/")
  };

  useEffect(() => {
    const userData = localStorage.getItem('user') || '{}';
    dispatch(userLoggedIn({ user: JSON.parse(userData) }));
  }, []);

  return (
    <div className="relative bg-white text-black-500 text-xs z-[91]">
      <Container>
        <div className="mx-auto flex justify-between items-center border-b border-[#f4f4f4] py-1">
          <div className="flex items-center space-x-6">
            <Dropdown id="currency" items={currencies} selected={currencies[0]} style="px-0" />
            <Dropdown id="currency" items={langauges} selected={langauges[0]} style="px-0" />
          </div>

          <div className="hidden sm:flex items-center space-x-6">
            {filteredLinks.map((item, index) => {
              if (item.name === 'login') {
                return user?.name ? <div className="relative">
                  <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="flex items-center text-[13px] tracking-[-0.13px] font-extralight uppercase hover:text-primary"
                  >
                    {item?.icon && <i className={cn(item.icon, 'text-[15px] mr-2')}></i>}
                    {user.name}
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-md border rounded-lg">
                      <Link href="/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Dashboard
                      </Link>
                      <Link href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div> : <Link
                  key={index}
                  href={"#"}
                  className="flex items-center text-[13px] tracking-[-0.13px] font-extralight uppercase hover:text-primary"
                  onClick={handleToggleLoginModal}
                >
                  {item?.icon && (
                    <i className={cn(item.icon, 'text-[15px] mr-2')}></i>
                  )}{' '}
                  {item.name}
                </Link>
              }
              return <Link
                key={index}
                href={item.name === 'login' ? "#" : item.url}
                className="flex items-center text-[13px] tracking-[-0.13px] font-extralight uppercase hover:text-primary"
                onClick={item.name === 'login' && !user?.name ? handleToggleLoginModal : undefined}
              >
                {item?.icon && <i className={cn(item.icon, 'text-[15px] mr-2')}></i>}
                {item.name}
              </Link>
            })}
          </div>
          <div className="flex items-center sm:hidden">
            <DropdownMenu items={topBarLinks} label="Links" position="bottom-right" />
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
