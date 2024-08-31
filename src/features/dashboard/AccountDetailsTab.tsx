import Button from '@/components/Button';
import Input from '@/components/Input';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const AccountDetailsTab = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const data: any = useSelector(state => state)
  const {email, name} = data?.auth?.user || {}

  console.log("data", email, name);
  return (
    <form className="mt-1.5">
      <div className="flex flex-col gap-[13px]">
        <div className="grid sm:grid-cols-2 gap-[13px] sm:gap-5">
          <Input label="First Name *" />
          <Input label="Last Name *" />
        </div>
        <div>
          <Input label="DisplayName" />
          <small className="text-[11px] mt-2 text-black-200 font-light">
            This will be how your name will be displayed in the account section
            and in reviews
          </small>
        </div>
        <div>
          <Input label="Email *" />
        </div>
        <div>
          <Input label="Current password (leave blank to leave unchanged)" />
        </div>
        <div>
          <Input label="New password (leave blank to leave unchanged)" />
        </div>
        <div>
          <Input label='Confirm new password'/>
        </div>
      </div>
        <Button className='uppercase mt-5'>Save changes <i className="las la-long-arrow-alt-right ml-2.5"></i></Button>
    </form>
  );
};

export default AccountDetailsTab;
