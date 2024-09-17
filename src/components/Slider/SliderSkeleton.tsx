import { arrayNumberGenerator, cn } from "@/lib/utils";
import { FC } from "react";

interface SliderSkeletonProps {
  items?: number;
  className?: string;
}

const SliderSkeleton: FC<SliderSkeletonProps> = () => {
  return (
    <div className="w-fullh-[460px] lg:h-[480px] xl:h-[560px] bg-black-600 animate-pulse mb-10"></div>
  );
};

export default SliderSkeleton;
