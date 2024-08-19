import { cn } from '@/lib/utils';
import { useState } from 'react';
import DashboardTab from './DashboardTab';
import OrderTab from './OrderTab';
import DownloadsTab from './DownloadsTab';
import AddressTab from './AddressTab';
import AccountDetailsTab from './AccountDetailsTab';
import { useRouter } from 'next/navigation';

const DashboardComponent = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<number>(1);
  const tabs = [
    {
      id: 1,
      label: 'Dashboard',
      content: <DashboardTab handleTabChange={setActiveTab} />,
    },
    { id: 2, label: 'Orders', content: <OrderTab /> },
    { id: 3, label: 'Downloads', content: <DownloadsTab /> },
    { id: 4, label: 'Address', content: <AddressTab /> },
    { id: 5, label: 'Account Details', content: <AccountDetailsTab /> },
    { id: 6, label: 'Signout', content: <div>Login Content</div> },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full gap-5 mt-[30px] mb-[50px]">
      <ul className="flex flex-col md:max-w-[335px] border-gray-300 mb-[30px]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <li
              key={tab.id}
              onClick={() =>
                tab.id === 6 ? router.push('/auth') : setActiveTab(tab.id)
              }
              className={cn(
                'relative text-sm font-extralight leading-[21px] py-[14px] hover:text-primary cursor-pointer border-b border-black-300',
                isActive && 'pl-5 text-primary'
              )}
            >
              <i
                className={cn(
                  'las la-long-arrow-alt-right flex absolute text-[15px] items-center h-[15px] left-[-20px] top-0 bottom-0 my-auto opacity-0 invisible transition-all duration-[0.35s]',
                  isActive && 'left-0 opacity-1 visible'
                )}
              ></i>
              {tab.label}
            </li>
          );
        })}
      </ul>
      <div className="flex-1 bg-white">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${activeTab === tab.id ? 'block' : 'hidden'}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardComponent;
