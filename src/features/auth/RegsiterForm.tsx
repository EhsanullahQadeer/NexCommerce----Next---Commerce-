import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Input from '@/components/Input';
import Link from 'next/link';

const RegisterForm = () => {
  return (
    <div>
      <form className="space-y-4">
        <div className="relative">
          <Input
            name="email"
            label="You email address *"
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <div className="relative">
          <Input
            name="password"
            label="Password *"
            autoComplete="current-password"
            type="password"
            required
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center mb-[23px] pb-[30px] border-b border-black-300 gap-y-2.5 sm:gap-y-0">
          <Button className="!max-w-full !w-full sm:!max-w-auto sm:!w-auto sm:mr-4 !h-[40px] justify-center uppercase !px-[15px]">
            Register
            <i className="las la-long-arrow-alt-right ml-2.5 text-ms"></i>
          </Button>
          <Checkbox
            label={
              <>
                I agree to the{' '}
                <Link href="#" className="underline hover:text-primary">
                  privacy policy
                </Link>{' '}
                *
              </>
            }
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
