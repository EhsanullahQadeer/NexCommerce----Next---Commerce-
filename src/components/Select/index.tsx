import { cn } from '@/lib/utils';
import { FC } from 'react';

const selectBaseStyles =
  'bg-white appearance-none row-start-1 col-start-1 font-extralight border border-[#d7d7d7] text-black-500 text-sm outline-none pr-[30px] pl-2.5 bg-none cursor-pointer';
const iconStyles =
  'las la-angle-down !flex items-center text-[10px] pointer-events-none z-10 right-1 relative col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidde';
const sizes = {
  md: 'h-[30px] text-[13px]',
  lg: 'h-10 text-sm',
};

interface SelectProps {
  options: {
    label: string;
    value: string | number;
  }[];
  value?: string;
  label?: string;
  size?: 'md' | 'lg';
}

const Select: FC<SelectProps> = ({ options, value, label, size = 'lg' }) => {
  return (
    <div className="grid">
      <i className={iconStyles}></i>
      <select
        className={cn(selectBaseStyles, sizes[size])}
        defaultValue={value}
        aria-label={label}
      >
        {label && <option>{label}</option>}
        {options.map((item, index) => (
          <option
            key={index}
            value={item.value}
            className="!cursor-pointer"
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
