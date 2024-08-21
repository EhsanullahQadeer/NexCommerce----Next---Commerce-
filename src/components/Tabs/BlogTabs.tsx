import { cn } from '@/lib/utils';
import { FC, ReactNode, useState } from 'react';

interface TabsProps {
    tabs: {
        label: {
            text: string;
            availableItems: number;
        }; content: ReactNode
    }[];
}

const BlogTabs: FC<TabsProps> = ({ tabs }) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <div>
            <div className="flex items-center justify-center gap-1 flex-wrap sm:gap-5">
                {tabs.map((tab, idx) => {
                    return (
                        <button
                            key={idx}
                            className={cn(
                                'flex items-center gap-x-2 py-[6px] mx-2 text-sm font-light border-b transition-colors duration-300 tracking-[-0.16px] leading-[18px] text-[#333333] hover:text-primary',
                                idx === activeTabIndex
                                    ? 'text-primary border-primary'
                                    : 'border-transparent hover:primary'
                            )}
                            onClick={() => setActiveTabIndex(idx)}
                        >
                            <span>{tab.label.text}</span><span className='text-[#cccccc]'>{tab.label.availableItems}</span>
                        </button>
                    );
                })}
            </div>

            <div className="mt-[-1px] py-[27px] px-[30px]">
                {tabs[activeTabIndex].content}
            </div>
        </div>
    );
};

export default BlogTabs;
