import { FC } from "react";

const selectBaseStyles = 'h-10 bg-white appearance-none row-start-1 col-start-1 font-light border border-[#d7d7d7] text-black-500 text-sm outline-none pr-[30px] pl-2.5 bg-none'

interface SelectProps {
  options: {
    label: string;
    value: string | number;
  }[];
  value?: string;
  label: string;
}

const Select: FC<SelectProps> = ({ options, value, label }) => {
  return (
    <div className="grid">
      <i className="las la-angle-down flex items-center text-[10px] pointer-events-none z-10 right-1 relative col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidde"></i>
      <select className={selectBaseStyles} value={value}>
        <option>{label}</option>
        {options.map(item => (
          <option key={item.value} value={item.value}>{item.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
