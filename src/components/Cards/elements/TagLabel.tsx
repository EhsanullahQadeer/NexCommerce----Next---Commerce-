import { FC } from 'react';

interface TagLabelProps {
  label: string;
  className?: string;
}

const TagLabel: FC<TagLabelProps> = ({ label }) => {
  return (
    <span className="absolute text-[13px] font-light top-5 left-5 bg-white px-[9px] py-[5px]">
      {label}
    </span>
  );
};

export default TagLabel;
