import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Input from '@/components/Input';
import Link from 'next/link';

const LoginForm = () => {
  return (
    <div>
      <form className="space-y-4">
        <div className="relative">
          <Input
            name="email"
            label="Username or email address *"
            type="email"
            autoComplete="username"
            required
          />
        </div>

        <div className="relative">
          <Input name="password" label="Password *" type="password" autoComplete="current-password" required />
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between mb-[23px] pb-[30px] border-b border-black-300 gap-y-[6px] sm:gap-y-0">
          <div className="w-full flex flex-col-reverse sm:flex-row">
            <Button className="!max-w-full !w-full sm:!max-w-[115px] sm:!w-full !h-[40px] !px-[15px] sm:mr-4 mt-2.5 sm:mt-0 justify-center uppercase">
              Log in
              <i className="las la-long-arrow-alt-right ml-2.5 text-sm"></i>
            </Button>
            <Checkbox label="Remember me" labelClass="whitespace-nowrap" />
          </div>
          <Link
            href=""
            className="text-sm text-black-100 font-extralight leading-[26.04px] whitespace-nowrap"
          >
            Forgot Your Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
