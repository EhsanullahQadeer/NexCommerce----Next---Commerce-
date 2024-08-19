import { FC } from 'react';
import { cn } from '@/lib/utils';

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  rows?: number;
}

const baseInputStyles =
  'block w-full border border-black-300 px-4 py-1.5 text-sm leading-6 focus:bg-white focus:border-primary outline-none transition-all duration-[0.35s]';

const labelStyles =
  'inline-block text-sm text-black-100 font-extralight mb-1 leading-[26.04px]';

const TextArea: FC<TextAreaProps> = ({ className, label, ...props }) => {
  const renderLabel = label && <label className={labelStyles}>{label}</label>;

  return (
    <div>
      {renderLabel}
      <textarea {...props} className={cn('bg-[#fafafa] border border-black-300 font-extralight', baseInputStyles, className)} />
    </div>
  );
};

export default TextArea;
