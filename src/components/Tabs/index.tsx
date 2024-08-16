import { cn } from '@/lib/utils';
import { FC, ReactNode, useState } from 'react';

interface TabsProps {
  tabs: { label: string; content: ReactNode }[];
}

const Tabs: FC<TabsProps> = ({ tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div>
      <div className="flex items-center justify-center gap-1 flex-wrap sm:gap-5">
        {tabs.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={cn(
                'py-[6px] px-[30px] text-base font-light border-b-2 transition-colors duration-300 tracking-[-0.16px] leading-[24px] hover:text-primary',
                idx === activeTabIndex
                  ? 'text-primary border-primary'
                  : 'border-transparent hover:primary'
              )}
              onClick={() => setActiveTabIndex(idx)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="border border-[#dadada] rounded-[3px] mt-[-1px] py-[27px] px-[30px]">
        {tabs[activeTabIndex].content}
      </div>
    </div>
  );
};

export default Tabs;
