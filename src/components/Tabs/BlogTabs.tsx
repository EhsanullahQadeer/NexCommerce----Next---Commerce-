import { FC } from "react";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { BlogCategory } from "@/types/blog";
import { useSelector } from "react-redux";

interface TabsProps {
  tabs: BlogCategory[];
  onTabChange: (tab: string) => void;
}

const BlogTabs: FC<TabsProps> = ({ tabs, onTabChange }) => {
  const activeFilter = useSelector((state: RootState) => state.blogs.filterKey);

  return (
    <div>
      <div className="flex items-center justify-center gap-1 flex-wrap sm:gap-5">
        {tabs.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={cn(
                "flex items-center gap-x-2 py-[6px] mx-2 text-sm font-light border-b transition-colors duration-300 tracking-[-0.16px] leading-[18px] text-[#333333] hover:text-primary",
                tab.key === activeFilter
                  ? "text-primary border-primary"
                  : "border-transparent hover:primary"
              )}
              onClick={() => onTabChange(tab.key)}
            >
              <span>{tab.label}</span>
              <span className="text-[#cccccc]">{tab.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BlogTabs;
