import Button from '@/components/Button';
import Input from '@/components/Input';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUserUpdateMutation } from '@/store/api/authApi';

const AccountDetailsTab = () => {
  const [userUpdate] = useUserUpdateMutation();
  const data: any = useSelector(state => state)
  const [formData, setFormData] = useState(data?.auth?.user || {});
  const [updateFieldValues, setUpdateFieldVlues] = useState({});

  const onChange = (key: any, val: any) => {
    let _vals = { ...formData }
    _vals[key] = val

    if (val.trim() == "") {
      delete _vals[key]
    }
    setFormData(_vals)
    setUpdateFieldVlues(prev => ({ ...prev, [key]: val }));
  }

  const handleSave = async (e: any) => {
    e.preventDefault()
    let data = {
      name: formData?.name,
      surname: formData?.surname,
      email: formData?.email
    }
    const response = await userUpdate(data)
    console.log(JSON.stringify(response))
  }

  return (
    <form className="mt-1.5">
      <div className="flex flex-col gap-[13px]">
        <div className="grid sm:grid-cols-2 gap-[13px] sm:gap-5">
          <Input label="First Name *" value={formData?.name} onChange={(e) => onChange("name", e.target.value)} />
          <Input label="Last Name *" value={formData?.surname} onChange={(e) => onChange("surname", e.target.value)} />
        </div>
        <div>
          <Input label="DisplayName" />
          <small className="text-[11px] mt-2 text-black-200 font-light">
            This will be how your name will be displayed in the account section
            and in reviews
          </small>
        </div>
        <div>
          <Input label="Email *" value={formData?.email} onChange={(e) => onChange("email", e.target.value)} />
        </div>
        <div>
          <Input label="Current password (leave blank to leave unchanged)" />
        </div>
        <div>
          <Input label="New password (leave blank to leave unchanged)" />
        </div>
        <div>
          <Input label='Confirm new password (leave blank to leave unchanged)' />
        </div>
      </div>
      <Button className='uppercase mt-5' onClick={(e) => handleSave(e)} >Save changes <i className="las la-long-arrow-alt-right ml-2.5"></i></Button>
    </form>
  );
};

export default AccountDetailsTab;
