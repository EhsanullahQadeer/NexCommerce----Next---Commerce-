import { FC, useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegsiterForm';
import { cn } from '@/lib/utils';
import Button from '@/components/Button';
import Container from '@/components/Container';

const tabButtonStyles =
  'w-1/2 text-center p-2.5 text-black-75 font-normal text-xl sm:text-2xl transition-colors duration-300 tracking-[-0.6px]';

interface AuthComponentProps {
  setIsOpen?: (isOpen: boolean) => void;
}

const AuthComponent: FC<AuthComponentProps> = ({ setIsOpen }) => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="w-full max-w-[575px] mx-auto py-[22px] px-5 pb-[44px] sm:py-[37px] sm:pb-[64px] sm:px-[60px] bg-white shadow-lg">
      <div className="flex">
        <button
          onClick={() => setActiveTab('login')}
          className={cn(
            tabButtonStyles,
            activeTab === 'login' && 'border-b-2 border-primary'
          )}
        >
          Sign In
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={cn(
            tabButtonStyles,
            activeTab === 'register' && 'border-b-2 border-primary'
          )}
        >
          Register
        </button>
      </div>
      <div className="border-t border-gray-200 pt-5 -mt-[1px]">
        {activeTab === 'login' ? <LoginForm setIsOpen={setIsOpen} /> : <RegisterForm setIsOpen={setIsOpen} />}
      </div>
      <div className="mt-[23px]">
        <p className="text-sm text-center text-black-500 font-light mb-[27px]">
          or sign in with{' '}
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-x-5 gap-y-[6px]">
          <Button
            variant="outlined"
            className="max-w-full w-full !h-10 justify-center !text-black-75 !border-black-300 hover:!bg-[#f5f6f9]"
          >
            <svg
              viewBox="0 0 488 512"
              className="h-[14px] !text-[#cc3333] mr-2.5"
            >
              <path
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                fill="currentColor"
              />
            </svg>{' '}
            Login With Google
          </Button>
          <Button
            variant="outlined"
            className="max-w-full w-full !h-10 justify-center !text-black-75 !border-black-300 hover:!bg-[#f5f6f9]"
          >
            <i className="la la-facebook text-[#3366cc] text-sm mr-2"></i>
            Login With Facebook
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
