import React from 'react';

interface IconWithTextProps {
  icon: React.ReactNode;
  text: string;
}

const textOverlayStyles =
  'absolute flex text-[11px] font-extralight items-center justify-center !z-[-1] bg-primary text-white invisible opacity-0 translate-x-[5px] top-0 bottom-0 right-4 rounded-tl-[30px] rounded-bl-[30px] w-[100px] group-hover/cart:opacity-100 group-hover/cart:visible group-hover/cart:translate-x-0 transition-all duration-[0.35s] ease';
export const baseIconStyles =
  'flex w-[30px] h-[30px] text-base items-center justify-center rounded-full bg-white text-primary group-hover/cart:bg-primary group-hover/cart:text-white transition-all duration-[0.35s] ease';

const IconWithText: React.FC<IconWithTextProps> = ({ icon, text }) => {
  return (
    <div className="relative flex items-center cursor-pointer group/cart">
      <div className={baseIconStyles}>{icon}</div>
      <span className={textOverlayStyles}>{text}</span>
    </div>
  );
};

export default IconWithText;
